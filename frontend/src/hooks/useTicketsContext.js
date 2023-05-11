import { TicketsContext } from '../context/ticketContext';
import { useContext } from 'react';

export default function useTicketsContext() {
  const context = useContext(TicketsContext);
  if (!context) {
    throw Error('useTicketContext must be used inside a TicketsProvider');
  }
  return context;
}
