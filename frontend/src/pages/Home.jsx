import useAuthContext from '../hooks/useAuthContext';
import Container from '../components/Container';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user } = useAuthContext();
  console.log(user);

  if (!user) {
    return (
      <div className="flex items-center justify-center">
        <Container>
          <div className="flex items-center justify-center flex-col gap-9">
            <header className="flex items-center justify-center flex-col gap-9">
              <h1 className="text-3xl md:text-5xl text-center">
                You need to be signed in to use this app.
              </h1>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full">
                <Link
                  className="bg-blue-600 px-3 py-1 text-white rounded hover:bg-blue-800 ease-in-out duration-300 w-1/2 text-center"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="bg-white px-3 py-1 text-black border-2 hover:text-white border-blue-800 rounded hover:bg-blue-800 ease-in-out duration-300 w-1/2 text-center"
                  to="/sign-up"
                >
                  Sign up
                </Link>
              </div>
            </header>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <Container>
        <div className="flex items-center justify-center flex-col gap-9">
          <header>
            <h1 className="text-3xl md:text-5xl text-center">
              Welcome back, {user.name}!
            </h1>
          </header>
        </div>
      </Container>
    </div>
  );
}

// if (!user) {
//   <div className="flex items-center justify-center">
//     <Container>
//       <div className="flex items-center justify-center flex-col gap-9">
//         <header>
//           <h1 className="text-3xl md:text-5xl text-center">
//             You need to be signed in to use this app.
//           </h1>
//           <div className="flex flex-col lg:flex-row gap-6">
//             <Link to="/login">Login</Link>
//             <Link to="/sign-up">Sign up</Link>
//           </div>
//         </header>
//       </div>
//     </Container>
//   </div>;
// }

// if (user) {
//   return (
//     <div className="flex items-center justify-center">
//       <Container>
//         <div className="flex items-center justify-center flex-col gap-9">
//           <header>
//             <h1 className="text-3xl md:text-5xl text-center">
//               Welcome back, {user.name}!
//             </h1>
//           </header>
//         </div>
//       </Container>
//     </div>
//   );
// }
