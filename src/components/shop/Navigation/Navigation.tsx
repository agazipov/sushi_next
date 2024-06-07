import { Navbar, Nav, NavLink, NavbarBrand, NavDropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import Link from "next/link";
import styles from "./styles.module.scss";
import { getAllCategories } from "@/src/services/menu";
import classNames from 'classnames';
import Cart from "../Cart/Cart";

export default async function Navigation() {
    const categories = await getAllCategories();

    return (
        <Navbar bg="dark" data-bs-theme="dark" className={styles.navigation}>
            <div className={classNames(styles.navigation__container)}>
                <NavbarBrand
                    className={styles.navigation__brand}
                    as={Link}
                    href={'/'}
                >Рыба&Рис</NavbarBrand>
                <Nav className={classNames("me-auto", styles.navigation__modify)}>
                    <NavDropdown
                        title="Роллы"
                        menuVariant="dark"
                    >
                        {categories.slice(0, 3).map((categorie) => {
                            return (
                                <DropdownItem
                                    key={categorie.id}
                                    className={styles.navigation__dropdown}
                                    as={Link}
                                    href={`/${categorie.id}`}
                                >{categorie.name}
                                </DropdownItem>
                            )
                        })}
                    </NavDropdown>
                    {categories.slice(3).map((categorie) => {
                        return (
                            <NavLink
                                key={categorie.id}
                                as={Link}
                                href={`/${categorie.id}`}
                            >{categorie.name}
                            </NavLink>
                        )
                    })}
                </Nav>
            </div>
            <Cart />
        </Navbar >
    )
}