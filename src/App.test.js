// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Moonwave title', () => {
  render(<App />);
  // 'Moonwave 가족 여행일정' 텍스트가 화면에 존재하는지 확인
  const titleElement = screen.getByText(/Moonwave 가족 여행일정/i);
  expect(titleElement).toBeInTheDocument();
});
