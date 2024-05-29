import { Navbar, Nav, NavLink, NavbarBrand } from "react-bootstrap";
import Link from "next/link";
import styles from "./styles.module.css";
import { getAllCategories } from "@/src/services/menu";
import classNames from 'classnames';

export default async function Navigation() {
    const categories = await getAllCategories();

    return (
        <Navbar bg="dark" data-bs-theme="dark" className={styles.navigation}>
            <div className={classNames(styles.navigation__container, "container")}>
                <NavbarBrand
                    className={styles.navigation__brand}
                    as={Link}
                    href={'/'}
                >ГЛАВНАЯ</NavbarBrand>
                <Nav className={classNames("me-auto")}>
                    {categories.map((categorie) => {
                        return (
                            <NavLink
                                key={categorie.id}
                                as={Link}
                                href={`/${categorie.id}`}
                            >{categorie.name}</NavLink>
                        )
                    })}
                </Nav>
            </div>
        </Navbar>
    )
}