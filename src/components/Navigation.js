import React from 'react'
import { Nav , NavItem } from 'react-bootstrap'
import { Route , Link, NavLink } from 'react-router-dom'
import {FiHome, FiMessageCircle} from 'react-icons/fi'

export default function Navigation() {
    return (
        <div>
            <Nav defaultActiveKey="/home" className="flex-column">
                <NavItem>
                    <NavLink activeClassName="bg-primary text-white" className="ps-3 pe-3 text-white pt-2 pb-2 d-block text-decoration-none" to="/" exact ><FiHome/> <span>DASHBOARD</span></NavLink>
                    <NavLink activeClassName="bg-primary text-white" className="ps-3 pe-3 text-white pt-2 pb-2 d-block text-decoration-none" to="/chat" ><FiMessageCircle/> <span>CHAT</span></NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}
