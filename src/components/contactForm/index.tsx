'use client'
import { useState } from 'react';
import styles from '../../styles/contactForm.module.css';
import Spinner from '../spinner';

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};


const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case 'name':
        setErrors({
          ...errors,
          name: value.length < 3 ? 'El nombre debe tener al menos 3 caracteres.' : ''
        });
        break;
      case 'email':
        setErrors({
          ...errors,
          email: !validateEmail(value) ? 'Por favor, introduce un email válido.' : ''
        });
        break;
      case 'message':
        setErrors({
          ...errors,
          message: value.length < 10 ? 'El mensaje debe tener al menos 10 caracteres.' : ''
        });
        break;
      default:
        break;
    }

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: formData.name.length < 3 ? 'El nombre debe tener al menos 3 caracteres.' : '',
      email: !validateEmail(formData.email) ? 'Por favor, introduce un email válido.' : '',
      message: formData.message.length < 10 ? 'El mensaje debe tener al menos 10 caracteres.' : '',
    };

    if (Object.values(newErrors).some(error => error !== '')) {
      setErrors(newErrors);
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }, 2000);
  };

  return (
    <section className={styles.contactForm} data-testid="contact-form">
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <small className={styles.error}>{errors.name}</small>}
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <small className={styles.error}>{errors.email}</small>}
        </div>
        <div className={styles.field}>
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
           {errors.message && <small className={styles.error}>{errors.message}</small>}
        </div>
        <button type="submit" className={`${styles.button} ${isSending ? styles.sending : ''}`}>
          {isSending ? <Spinner /> : <span>Enviar</span>}
        </button>
      </form>
      {showMessage && <div className={styles.toast}>¡Mensaje enviado con éxito!</div>}
    </section>

  );
};

export default ContactForm;
