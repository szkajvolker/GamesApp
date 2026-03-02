import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GameCard from "../components/GameCard";
import * as rawgAPI from "../api/rawgAPI";

jest.mock("../api/rawgAPI", () => ({
  fetchGameTrailers: jest.fn(),
}));
describe("GameCard Component", () => {
  const mockProps = {
    title: "Cyberpunk 2077",
    id: 5,
    image: "cyberpunk.jpg",
    metacritic: 85,
    genres: ["Action", "Adventure"],
    rating: 4.5,
    platforms: ["PlayStation 5", "Xbox Series X"],
    onDetailsClick: jest.fn(),
    releaseDate: "2023-10-15",
    esrbRating: "everyone",
    stores: ["Steam", "PlayStation Store"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("Rendering Tests", () => {
    it("renders basic game information", () => {
      render(<GameCard {...mockProps} />);

      expect(screen.getByText("Cyberpunk 2077")).toBeInTheDocument();
      expect(screen.getByAltText("Cyberpunk 2077")).toBeInTheDocument();
      expect(screen.getByText("85")).toBeInTheDocument();
      expect(screen.getByText("4.5")).toBeInTheDocument();
      expect(screen.getByAltText("Xbox Series X")).toBeInTheDocument();
    });

    it("renders expanded information when isOpen is true", () => {
      render(<GameCard {...mockProps} isOpen={true} />);

      expect(screen.getByText("Action")).toBeInTheDocument();
      expect(screen.getByText("2023-10-15")).toBeInTheDocument();
      expect(screen.getByText("everyone")).toBeInTheDocument();
      expect(screen.getByText("Steam")).toBeInTheDocument();
    });

    it("does not render rating UI when rating is null or undefined or value incorrect", () => {
      render(<GameCard {...mockProps} rating={null} />);
      expect(screen.queryByText(/N\/A|[0-9]+\.[0-9]/)).toBeNull();
      expect(screen.queryByText("⭐")).toBeNull();

      render(<GameCard {...mockProps} rating={undefined} />);
      expect(screen.queryByText(/N\/A|[0-9]+\.[0-9]/)).toBeNull();
    });

    it('shows "N/A" when rating is negative', () => {
      render(<GameCard {...mockProps} rating={-1} />);
      expect(screen.getByText("N/A")).toBeInTheDocument();
    });
  });
  describe("User Interactions", () => {
    it("calls onDetailsClick when details button is clicked", () => {
      render(<GameCard {...mockProps} />);

      const detailsButton = screen.getByLabelText("show-details");
      fireEvent.click(detailsButton);
      expect(mockProps.onDetailsClick).toHaveBeenCalledWith(mockProps.id);
    });
    it("calls onDetailsClicked when title is clicked", () => {
      render(<GameCard {...mockProps} />);

      const titleButton = screen.getByText("Cyberpunk 2077");
      fireEvent.click(titleButton);

      expect(mockProps.onDetailsClick).toHaveBeenCalledWith(mockProps.id);
    });
  });
  describe("Conditional Styling", () => {
    it("shows correct metacritic color for score higher than 75", () => {
      render(<GameCard {...mockProps} metacritic={85} />);

      const score = screen.getByText("85");
      expect(score.className).toContain("text-green-500");
    });
    it("shows correct metacritic color for score between 50-74", () => {
      render(<GameCard {...mockProps} metacritic={70} />);

      const score = screen.getByText("70");
      expect(score.className).toContain("text-yellow-500");
    });
    it("shows correct metacritic color for score lower than 50", () => {
      render(<GameCard {...mockProps} metacritic={45} />);

      const score = screen.getByText("45");
      expect(score.className).toContain("text-yellow-200");
    });
  });

  describe("Trailer & playback", () => {
    it("loads trailer on hover, shows Play,plays video, toggles sound and stops", async () => {
      rawgAPI.fetchGameTrailers.mockResolvedValueOnce([
        { data: { max: "http://test/video.mp4" } },
      ]);
      const { container } = render(<GameCard {...mockProps} />);
      fireEvent.mouseEnter(screen.getByAltText("Cyberpunk 2077"));

      fireEvent.mouseEnter(screen.getByAltText("Cyberpunk 2077"));
      await waitFor(() =>
        expect(screen.getByText("Play")).not.toHaveAttribute("hidden"),
      );
      const playBtn = screen.getByText("Play");
      fireEvent.click(playBtn);
      await waitFor(() =>
        expect(screen.getByTestId("game-trailer")).toBeInTheDocument(),
      );

      const video = container.querySelector("video");
      expect(video).toBeVisible();
      expect(video.muted).toBe(true);

      const onSoundBtn = screen.getByText("🔇");
      fireEvent.click(onSoundBtn);
      expect(video.muted).toBe(false);

      const noSoundBtn = screen.getByText("🔊");
      fireEvent.click(noSoundBtn);
      expect(video.muted).toBe(true);

      const stopBtn = screen.getByText("Stop");
      fireEvent.click(stopBtn);
      await waitFor(() => expect(container.querySelector("video")).toBeNull());
    });
  });

  it("handles no trailer gracefully (no Play button rendered)", async () => {
    rawgAPI.fetchGameTrailers.mockResolvedValueOnce([]);
    render(<GameCard {...mockProps} />);

    const playBtn = screen.getByText("Play");
    expect(playBtn).toHaveAttribute("hidden");
    expect(playBtn).not.toBeVisible();
  });
});
