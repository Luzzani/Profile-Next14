import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from '..';

describe('ContactForm', () => {
  it('renders ContactForm correctly', () => {
    const { getByText, getByLabelText } = render(<ContactForm />);

    expect(getByText('Contacto')).toBeTruthy();
    expect(getByLabelText('Nombre')).toBeTruthy();
    expect(getByLabelText('Email')).toBeTruthy();
    expect(getByLabelText('Mensaje')).toBeTruthy();
    expect(getByText('Enviar')).toBeTruthy();
  });

  it('submits the form with valid data and shows success message', () => {
    const { getByLabelText, getByText, getByTestId } = render(<ContactForm />);

    fireEvent.change(getByLabelText('Nombre'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText('Mensaje'), { target: { value: 'Hola, este es un mensaje de prueba.' } });

    fireEvent.submit(getByTestId('contact-form'));

    waitFor(() => expect(getByText('¡Mensaje enviado con éxito!')).toBeTruthy());
  });

  it('does not submit the form with invalid data', () => {
    const { getByLabelText, getByText, getByTestId } = render(<ContactForm />);

    fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText('Mensaje'), { target: { value: 'Hola, este es un mensaje de prueba.' } });

    fireEvent.submit(getByTestId('contact-form'));

    waitFor(() => expect(getByText('¡Mensaje enviado con éxito!')).not.toBeTruthy());
  });
});
