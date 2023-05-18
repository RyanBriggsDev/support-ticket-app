import Container from './Container';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white text-center flex items-center justify-center px-3 py-6">
      <Container>
        <div className="flex gap-12 justify-center text-start">
          <div className="px-3">Support Ticket App</div>
          <FooterSection data={adminData} />
        </div>
      </Container>
    </footer>
  );
}

const FooterSection = ({ data }) => {
  console.log(data);
  const navigate = useNavigate();
  return (
    <div>
      <ul className="px-3 flex flex-col gap-1">
        <h4 className="text-xl">{data.header}</h4>
        {/* {data.links.map((link, index) => (
          <li onClick={() => navigate}>{}</li>
        ))} */}
      </ul>
    </div>
  );
};
