import Container from './Container';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from '../hooks/useAdminContext';
import useAuthContext from '../hooks/useAuthContext';

export default function Footer() {
  const year = new Date().getFullYear();
  const { admin } = useAdminContext();
  const { user } = useAuthContext();
  const adminData = [
    {
      header: 'Admin Account',
      links: [
        { text: 'Dashboard', route: '/admin/dashboard' },
        { text: 'Sign Up', route: '/admin/signup' },
        { text: 'Login', route: '/admin/login' },
      ],
    },
  ];
  const userData = [
    {
      header: 'User Account',
      links: [
        { text: 'Tickets', route: '/tickets' },
        { text: 'Sign Up', route: '/sign-up' },
        { text: 'Login', route: '/login' },
      ],
    },
  ];

  return (
    <footer className="bg-blue-600 text-white text-center flex items-center justify-center px-3 py-9">
      <Container>
        <div className="flex gap-12 justify-center text-start">
          <div className="px-3">
            <h3 className="text-xl mb-3">Support Ticket App</h3>
            <p>
              <a href="https://github.com/ryanbriggsdev">
                © Ryan Briggs {year}
              </a>
            </p>
            <p>
              <a href="https://ryanbriggs.dev" target={'_blank'}>
                ryanbriggs.dev
              </a>
            </p>
          </div>
          {admin && <FooterSection data={adminData} />}
          {user && <FooterSection data={userData} />}
          {!admin && !user && (
            <>
              <FooterSection data={adminData} />
              <FooterSection data={userData} />
            </>
          )}
        </div>
      </Container>
    </footer>
  );
}

const FooterSection = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div>
      <ul className="px-3 flex flex-col gap-1">
        <h4 className="text-lg">{data[0].header}</h4>
        {data[0].links.map((link, index) => (
          <li
            className="hover:scale-105 duration-300 ease-in-out cursor-pointer hover:font-semibold"
            key={index}
            onClick={() => navigate(link.route)}
          >
            {link.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
