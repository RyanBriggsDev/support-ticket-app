import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../components/Container';

export default function SingleTicket() {
  const { id } = useParams();

  useEffect(() => {});

  return (
    <div className="flex justify-center items-center">
      <Container>single ticket</Container>
    </div>
  );
}
