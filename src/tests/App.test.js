import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(responseAPI),
      })
    );
    render(<App />);
  });

  test('Verifica se a página contém 20 cards',async () => {
    const cards = await screen.findAllByTestId('character-card');
    expect(cards).toHaveLength(20);
  })

  test('Verifica se aparece o card com titulo de "Rick Sanchez"',async () => {
    const title = screen.getByText('Rick Sanchez');
    expect(title).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const searchInput = screen.getByTestId('inputSearch');
    const searchButton = screen.getByRole('button', { name: /Buscar/i });
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem apenas 4 cards',async () => {
    const searchInput = screen.getByTestId('inputSearch');
    const searchButton = screen.getByRole('button', { name: /Buscar/i });
    userEvent.type(searchInput, 'Smith');
    userEvent.click(searchButton);
    const cards = await screen.findAllByTestId('character-card');
    expect(cards).toHaveLength(4);
  })

  test('Verifica se ao clicar no botão "Unknown" aparecem apenas 6 cards',async () => {
    const unknownButton = await screen.getByRole('button', { name: /Unknown/i });
    userEvent.click(unknownButton);
    const cards = await screen.findAllByTestId('character-card');
    expect(cards).toHaveLength(6);
  })

  test('Verifica se ao clicar no botão "All" aparecem 20 cards',async () => {
    const resetButton = await screen.getByRole('button', { name: /All/i });
    userEvent.click(resetButton);
    const cards = await screen.findAllByTestId('character-card');
    expect(cards).toHaveLength(20);
  })

  test('Verifica se ao clicar no botão "Alive" aparecem apenas 8 cards',async () => {
    const aliveButton = await screen.getByRole('button', { name: /Alive/i });
    userEvent.click(aliveButton);
    const cards = await screen.findAllByTestId('character-card');
    expect(cards).toHaveLength(8);
  })

  test('Verifica se ao clicar no botão "Dead" aparecem apenas 6 cards',async () => {
    const deadButton = await screen.getByRole('button', { name: /Dead/i });
    userEvent.click(deadButton);
    const cards = await screen.findAllByTestId('character-card');
    expect(cards).toHaveLength(6);
  })

  test('Verifica se ao clicar em um card é exibido um modal',async () => {
    const card = await screen.findByText('Rick Sanchez');
    userEvent.click(card);
    const modal = await screen.findByTestId('modal');
    expect(modal).toBeInTheDocument();
  })

  test('Verifica se ao clicar no botão "Close" o modal é fechado',async () => {
    const card = await screen.findByText('Rick Sanchez');
    userEvent.click(card);
    const closeButton = await screen.findByRole('button', { name: "X" });
    userEvent.click(closeButton);
    const modal = screen.queryByTestId('modal');
    expect(modal).not.toBeInTheDocument();
  })

})