import { render, screen } from '@testing-library/react';
import Tabs from './Tabs';

test('renders tabs component', async () => {
  render(<Tabs setIsLoading = {()=>{}}/>);
  const TabHeader1 = screen.getByText(/Analiza waluty/i);
  const TabHeader2 = screen.getByText(/Rozkład zmian par walutowych/i);
  const TabActiveContent = screen.queryByTestId('tab-content1');
  const TabInActiveContent = screen.queryByTestId('tab-content2');
  const activeTabClass = 'tabs-content_active';

  expect(TabHeader1).toBeInTheDocument();
  expect(TabHeader2).toBeInTheDocument();
  expect(TabActiveContent.classList.contains(activeTabClass)).toBeTruthy();
  expect(TabInActiveContent.classList.contains(activeTabClass)).toBeFalsy();
});
