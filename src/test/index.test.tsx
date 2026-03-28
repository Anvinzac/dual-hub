import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "@/App";

describe("Dual Hub landing flow", () => {
  it("opens the consumer hub from the split landing screen", async () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    fireEvent.click(await screen.findByRole("link", { name: /CV-tify/i }));

    expect(await screen.findByRole("button", { name: "Bạn quán" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tìm ứng dụng yêu thích...")).toBeInTheDocument();
    expect(screen.getByText("Xu hướng")).toBeInTheDocument();
  });

  it("opens the routed business hub from the consumer hub", async () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    fireEvent.click(await screen.findByRole("link", { name: /CV-tify/i }));
    fireEvent.click(screen.getByRole("button", { name: "Bạn quán" }));

    expect(await screen.findByPlaceholderText("Search tools...")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Bạn quán" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Gallery" })).toBeInTheDocument();
  });

  it("filters the consumer apps by category and search", async () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    fireEvent.click(await screen.findByRole("link", { name: /CV-tify/i }));
    await screen.findByText("CV-tify");

    const consumerGrid = within(screen.getByTestId("consumer-app-grid"));

    fireEvent.change(screen.getByPlaceholderText("Tìm ứng dụng yêu thích..."), {
      target: { value: "Cloud" },
    });

    expect(consumerGrid.getByText("CloudPaste")).toBeInTheDocument();
    expect(consumerGrid.queryByText("CV-tify")).not.toBeInTheDocument();

    expect(consumerGrid.getByText("CloudPaste")).toBeInTheDocument();
    expect(consumerGrid.queryByText("DebtDiv")).not.toBeInTheDocument();
  });

  it("switches from business hub back to consumer hub directly", async () => {
    window.history.pushState({}, "", "/business");
    render(<App />);

    expect(await screen.findByPlaceholderText("Search tools...")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Bạn khách" }));

    expect(await screen.findByPlaceholderText("Tìm ứng dụng yêu thích...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Bạn quán" })).toBeInTheDocument();
  });

  it("filters the business apps by category and search", async () => {
    window.history.pushState({}, "", "/business");
    render(<App />);

    await screen.findByPlaceholderText("Search tools...");
    await waitFor(() => expect(screen.getByRole("button", { name: "retail" })).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: "retail" }));

    fireEvent.click(screen.getByRole("button", { name: /POS Lite/i }));

    const businessList = within(screen.getByTestId("folder-pos-lite-folder-apps"));

    expect(businessList.getByText("Street Market")).toBeInTheDocument();
    expect(businessList.getByText("Retail Shop")).toBeInTheDocument();
    expect(businessList.getByText("Food Court")).toBeInTheDocument();
    expect(businessList.queryByText("Booking Page")).not.toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Search tools..."), {
      target: { value: "food court" },
    });

    expect(screen.getByRole("button", { name: /POS Lite/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Invoice Maker/i })).not.toBeInTheDocument();
    expect(businessList.getByText("Food Court")).toBeInTheDocument();
    expect(businessList.queryByText("Expense Log")).not.toBeInTheDocument();
  });
});
