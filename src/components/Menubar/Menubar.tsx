import { Brand, Ul, Li} from "./Theme";
import { Navbar } from "react-bootstrap";

const Menubar = (props: {
  brand: { name: string; to: string },
  links: Array<{ name: string, to: string }>
}) => {
  const { brand, links } = props;
  const NavLinks: any = () => links.map((link: { name: string, to: string }) => <Li key={link.name}><a href={link.to}>{link.name}</a></Li>);
  return (
    <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark" className=" fixed-bottom ">
       <Navbar.Collapse id="responsive-navbar-nav">
        
       </Navbar.Collapse>
      <Brand href={brand.to}>{brand.name}</Brand>
      <Ul>
        <NavLinks />
      </Ul>
    </Navbar >
  )
};

export default Menubar;