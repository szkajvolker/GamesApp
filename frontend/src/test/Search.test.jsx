import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import "@testing-library/jest-dom";
import React from "react";

jest.useFakeTimers();

describe("Searchbar Test", () => {
  it("renders the input field and icon", () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(
      screen.getByPlaceholderText("Search any games..."),
    ).toBeInTheDocument();
    expect(screen.getByAltText("search")).toBeInTheDocument();
  });

  it("displays the correct placeholder text", () => {
    render(<SearchBar onSearch={() => {}} placeholder="Test search..." />);
    expect(screen.getByPlaceholderText("Test search...")).toBeInTheDocument();
  });

  it("updates the input value when typing", () => {
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText("Search any games...");
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(input.value).toBe("Hello");
  });

  it("calls onSearch when Enter is pressed", async () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText("Search any games...");
    fireEvent.change(input, { target: { value: "Test game" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    await waitFor(() => expect(onSearchMock).toHaveBeenCalledWith("Test game"));
  });
});
