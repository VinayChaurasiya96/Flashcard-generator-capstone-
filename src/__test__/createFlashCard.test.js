import {fireEvent, render, screen} from "@testing-library/react";
import CreateFlashcard from "../pages/createFlashcard/CreateFlashcard";
import userEvent from "@testing-library/user-event";

test("group name input", () => {
  render(<CreateFlashcard />);
  const groupInputEl = screen.getByPlaceholderText(/group name/i);
  expect(groupInputEl).toBeInTheDocument();
});

test("upload image", () => {
  const file = new File(["hello"], "hello.png", {type: "image/png"});

  render(<CreateFlashcard />);
  const input = screen.getByLabelText(/Upload image/i);
  userEvent.upload(input, file);

  expect(input.files[0]).toStrictEqual(file);
  expect(input.files.item(0)).toStrictEqual(file);
  expect(input.files).toHaveLength(1);
});

test("group description", () => {
  render(<CreateFlashcard />);
  const groupInputEl = screen.getByPlaceholderText(/this is description/i);
  expect(groupInputEl).toBeInTheDocument();
});

test("validate flashcard form", async () => {
  render(<CreateFlashcard />);

  const flashcardButton = screen.getByText("Create");
  fireEvent.click(flashcardButton);

  const groupInputErrorEl = await screen.findByText("Group Name is Required");
  const descriptionErrorEl = await screen.findByText("Description is Required");
  const termNameErrorEl = await screen.findByText("Term Name is Required");
  const termDefinationErrorEl = await screen.findByText(
    "Defination is Required"
  );

  expect(groupInputErrorEl).toBeVisible();
  expect(descriptionErrorEl).toBeVisible();
  expect(termNameErrorEl).toBeVisible();
  expect(termDefinationErrorEl).toBeVisible();
});

test("create flashcard", async () => {
  render(<CreateFlashcard />);

  const groupInputEl = screen.getByPlaceholderText(/group name/i);
  const groupDescriptionEl =
    screen.getByPlaceholderText(/this is description/i);
  const termNameEl = screen.getByTestId("termName");
  const termDescriptionEl = screen.getByTestId("termDesc");

  fireEvent.input(groupInputEl, {target: {value: "test"}});
  fireEvent.input(groupDescriptionEl, {target: {value: "desc"}});
  fireEvent.input(termNameEl, {target: {value: "test"}});
  fireEvent.input(termDescriptionEl, {target: {value: "vinay"}});

  const flashcardButton = screen.getByText("Create");
  fireEvent.click(flashcardButton);

  await setTimeout(async () => {
    const cardSuccessMsg = await screen.findByText("Created Successfully!");

    expect(cardSuccessMsg).toBeInTheDocument();
  }, 500);
});
