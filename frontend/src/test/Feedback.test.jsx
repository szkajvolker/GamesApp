import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Feedback from "../components/Feedback";
import * as feedbackAPI from "../api/feedbackAPI";

jest.mock("../api/feedbackAPI", () => ({
  sendFeedback: jest.fn(() => Promise.resolve({ success: true })),
}));

describe.only("Feedback Modal Component", () => {
  it("Renders basic form to feedback", () => {
    render(<Feedback onClose={() => {}} />);
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Subject (optional)")).toBeInTheDocument();
    expect(screen.getByText("Message")).toBeInTheDocument();
    expect(screen.getByText("Send Feedback")).toBeInTheDocument();
  });

  it("check message is not empty", () => {
    render(<Feedback onClose={() => {}} />);
    (fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "" },
    }),
      fireEvent.click(screen.getByRole("button", { name: /Send Feedback/i })));
    expect(feedbackAPI.sendFeedback).not.toHaveBeenCalled();
  });
});
