# JLPT-Quiz-MultipleAnswer


---

# Prefecture Flags Quiz App Documentation

## Overview

The Prefecture Flags Quiz App is a simple web-based application that allows users to test their knowledge of Japanese prefecture flags. The app presents the user with a series of flag images and multiple-choice questions, and provides immediate feedback on the correctness of their answers. At the end of the quiz, the user can view their results and play again if desired.

## Features

### 1. Quiz Interface

- Users can start the quiz by clicking the "Play" button.
- During the quiz, users are presented with flag images and multiple-choice options.
- Users can select an option by clicking on the corresponding button.
- Immediate feedback is provided after each selection, indicating whether the answer was correct or incorrect.
- After answering all questions, users can view their results, including the number of correct and incorrect answers.

### 2. Wrong Answers Review

- If the user answers any questions incorrectly, the app displays a list of wrong answers along with the correct flag images.
- Users can review their wrong answers to learn from their mistakes.

### 3. Play Again

- Users have the option to play the quiz again after viewing their results.

## Implementation Details

### Technologies Used

- **HTML:** Markup language for structuring the web page.
- **CSS:** Styling language for designing the user interface.
- **JavaScript:** Programming language for implementing interactive functionality.
- **Fetch API:** Used to fetch flag data from an external JSON file.
- **Flexbox:** CSS layout model for creating responsive designs.
- **Event Handling:** JavaScript event listeners for handling user interactions.
- **Dynamic Content Generation:** JavaScript functions for dynamically generating quiz questions and options.

### Components

1. **Quiz Container:** Contains the main quiz interface, including flag images and multiple-choice options.

2. **Modal:** Provides additional information or assistance to the user. It can be opened by clicking the "Help" button and closed by clicking the close button or outside the modal area.

3. **Result Container:** Displays the user's quiz results, including the number of correct and incorrect answers. It also contains a button to play the quiz again.

4. **Wrong Answers Display:** Presents a list of wrong answers along with the correct flag images for review.

## Usage

1. Open the Prefecture Flags Quiz App in a web browser.
2. Click the "Play" button to start the quiz.
3. Select an option for each question by clicking the corresponding button.
4. Receive immediate feedback on the correctness of each answer.
5. After completing the quiz, view the results and review any wrong answers.
6. Optionally, play the quiz again to improve your score.

---
