import { NavLink } from 'react-router-dom';

export const Navbar = () => {
    const style = {
        active: { color: "#808080", textDecoration: "none" },
        notActive: { color: "#E40086", textDecoration: "underline" },
      }
  return (
  <Container>
        <NavLink exact to="/" style={({ isActive }) => (isActive ? style.notActive : style.active)}>Home</NavLink><Text> | </Text>
        <NavLink exact to="/login" style={({ isActive }) => (isActive ? style.notActive : style.active)}>Login</NavLink><Text> | </Text>
        <NavLink exact to="/signup" style={({ isActive }) => (isActive ? style.notActive : style.active)}>Sign Up</NavLink><Text> | </Text>
  </Container>
  )
}

const Container = styled.nav`
    display: inline;
    justify-content: flex-end;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 25px 25px 5px;
`

const Text = styled.p`
        display: inline;
`