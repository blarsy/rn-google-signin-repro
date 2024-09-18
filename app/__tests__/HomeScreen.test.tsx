import { render, screen } from '@testing-library/react-native'
import HomeScreen from '../(tabs)'


it('basic test', () => {
  render(<HomeScreen/>)
  expect(screen.getAllByRole('button', { name: 'start' })).toBeOnTheScreen()
})