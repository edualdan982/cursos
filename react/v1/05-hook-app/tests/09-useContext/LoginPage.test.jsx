import { fireEvent, render, screen } from '@testing-library/react'
import { LoginPage } from '../../src/09-useContext/LoginPage';
import { UserContext } from '../../src/09-useContext/context/UserContext';

describe('Prueba en <LoginPage/>', () => {

  const user = {
    id: 1234, name: 'Dan', email: "correo@mail.com"
  };

  test('debe mostar el usuario en nulo', () => {
    render(<UserContext.Provider value={{ user: null }} >
      <LoginPage />
    </UserContext.Provider>);
    const preTag = screen.getByLabelText('pre');
    expect(preTag.innerHTML).toBe('null');
  });

  test('debe mostar el usuario', () => {
    render(<UserContext.Provider value={{ user: user }} >
      <LoginPage />
    </UserContext.Provider>);
    const preTag = screen.getByLabelText('pre');
    expect(JSON.parse(preTag.innerHTML)).toEqual(user);
  });

  test('debe llamar el setUser cuando se hace click en el boton', () => {

    const setUserMock = jest.fn();
    render(<UserContext.Provider value={{ user: null, setUser: setUserMock }} >
      <LoginPage />
    </UserContext.Provider>);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(setUserMock).toHaveBeenCalledWith(user);
  });
})