import React, { useState } from "react";
import "../sidebar.css";
import { RiDashboardLine } from "react-icons/ri";
import { TiGroup } from "react-icons/ti";
import { GiBlackBook, GiTeacher } from "react-icons/gi";
import {IoIosMedkit} from 'react-icons/io';
import {IoIosCall} from 'react-icons/io';
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { Route } from "react-router-dom";

const Sidebar = () => {
	const [istoggled, setIsToggled] = useState(false);
	// const [navOpener, setNavOpener] = useState(false);
	// const windowSizing = () => {
	// 	if (window.innerWidth < 1000) {
	// 		setIsToggled(false);
	// 		setNavOpener(true);
	// 	} else {
	// 		setIsToggled(true);
	// 		setNavOpener(false);
	// 	}
	// };
	// useEffect(() => {
	// 	window.addEventListener("resize", windowSizing);
	// 	windowSizing();
	// 	return () => {
	// 		window.removeEventListener("resize", windowSizing);
	// 	};
	// }, []);
	return (
		<Route
			render={({ location, history }) => (
				<>
					<SideNav
						expanded={istoggled}
						onToggle={() => {
							setIsToggled(!istoggled);
						}}
						onSelect={(selected) => {
							const to = "/" + selected;
							if (location.pathname !== to) {
								history.push(to);
							}
						}}
					>
						<SideNav.Toggle />
						{/* {navOpener ? <SideNav.Toggle /> : <div className="toggleHolder" />} */}
						<SideNav.Nav defaultSelected="">
							<NavItem eventKey="" className='mt-3'>
								<NavIcon>
									{/* <RiDashboardLine size="2rem" /> */}
                  <IoIosMedkit size="2rem"/>
								</NavIcon>
								<NavText>Emergencies</NavText>
							</NavItem>
							<NavItem eventKey="services" className='mt-3'>
								<NavIcon>
									<IoIosCall size="2rem" />
								</NavIcon>
								<NavText>Services</NavText>
							</NavItem>
							<NavItem eventKey="admins" className='mt-3'>
								<NavIcon>
									<TiGroup size="2rem" />
								</NavIcon>
								<NavText>Admins</NavText>
							</NavItem> 
						</SideNav.Nav>
					</SideNav>
				</>
			)}
		/>
	);
};

export default Sidebar;