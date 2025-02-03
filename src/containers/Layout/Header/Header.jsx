import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Sticky from 'react-stickynode';
import { IoIosClose } from 'react-icons/io';
import { Button, Drawer } from 'antd';
import Logo from 'components/UI/Logo/Logo';
import Text from 'components/UI/Text/Text';
import TextLink from 'components/UI/TextLink/TextLink';
import Navbar from 'components/Navbar/Navbar';
import { AuthContext } from 'context/AuthProvider';
import { LayoutContext } from 'context/LayoutProvider';
import useWindowSize from 'library/hooks/useWindowSize';
//import { AGENT_PROFILE_PAGE } from 'settings/constant';
import AuthMenu from './AuthMenu';
import MainMenu from './MainMenu';
import MobileMenu from './MobileMenu';
import ProfileMenu from './ProfileMenu';
import NavbarSearch from './NavbarSearch';
import HeaderWrapper, {
  MobileNavbar,
  CloseDrawer,
  AvatarWrapper,
  AvatarImage,
  AvatarInfo,
  LogoArea,
} from './Header.style';
import styled from 'styled-components';

const SvgIcon = styled.svg`
  /* Media query para dispositivos móveis */
  @media (max-width: 768px) {
    height: 50px;
    fill: #3498db;
  }
`;

const avatarImg = `http://s3.amazonaws.com/redqteam.com/isomorphic-reloaded-image/profilepic.png`;
const LogoIcon = () => (
  <SvgIcon version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1032.000000 1253.000000" preserveAspectRatio="xMidYMid meet">
    <g transform="translate(0.000000,1253.000000) scale(0.100000,-0.100000)" fill="#E6007B" stroke="none">
      <path d="M10 8105 l0 -4425 2983 0 2982 1 50 86 c28 48 82 120 121 162 l71 75 -63 124 c-182 359 -247 776 -188 1211 8 58 14 110 14 118 0 10 -47 13 -240 13 l-240 0 0 1471 0 1471 -57 -6 c-202 -23 -297 -75 -638 -350 -268 -216 -463 -332 -630 -376 -44 -11 -139 -26 -210 -32 -152 -13 -319 3 -488 47 -53 14 -99 25 -102 25 -3 0 -5 -506 -5 -1125 l0 -1125 -465 0 -465 0 0 2640 0 2640 463 -2 462 -3 3 -1483 2 -1483 33 5 c17 3 55 8 82 11 141 18 260 88 565 331 358 285 524 374 765 409 128 19 254 19 379 0 86 -13 235 -45 288 -61 17 -5 18 55 20 1133 l3 1138 460 0 460 0 3 -2194 2 -2194 88 84 c237 228 516 382 843 465 157 39 300 56 484 57 194 1 334 -19 565 -81 123 -33 149 -36 293 -39 l157 -4 0 2846 0 2845 -4425 0 -4425 0 0 -4425z"/>
      <path d="M7640 6719 c-788 -91 -1366 -684 -1451 -1492 -14 -134 -7 -391 15 -512 43 -240 159 -525 276 -675 15 -19 35 -47 44 -62 l17 -27 -57 -36 c-190 -122 -328 -336 -386 -600 -8 -37 -13 -123 -12 -225 1 -144 4 -177 27 -262 114 -428 484 -713 1030 -792 89 -13 221 -16 775 -16 861 -1 961 -8 1115 -88 118 -61 169 -153 170 -304 0 -78 -3 -94 -32 -152 -116 -236 -495 -357 -1121 -357 -478 -1 -1024 81 -1375 206 -112 39 -179 30 -223 -32 -11 -16 -70 -154 -132 -308 -104 -259 -112 -283 -108 -333 8 -97 68 -134 348 -216 605 -178 1500 -245 2053 -155 269 44 471 106 683 209 173 85 290 167 415 290 143 141 245 307 308 499 73 224 79 537 15 758 -115 397 -445 682 -919 791 -217 50 -282 54 -1100 61 -749 7 -772 8 -827 28 -108 40 -176 91 -210 156 -33 63 -30 163 7 245 30 66 107 147 151 158 14 4 54 -6 101 -24 108 -42 248 -78 378 -98 163 -25 464 -15 632 20 807 170 1333 814 1333 1630 0 243 -73 511 -195 716 l-45 75 228 5 c214 5 229 6 267 28 22 13 52 39 65 59 25 36 25 40 28 277 4 287 0 335 -35 376 -57 68 -20 64 -743 70 l-655 6 -155 41 c-259 68 -476 87 -700 62z"/>
      <path d="M7736 5574 c-88 -21 -174 -71 -246 -144 -113 -113 -163 -239 -162 -410 0 -207 99 -380 272 -474 86 -46 166 -66 270 -66 230 1 415 109 508 300 93 189 75 402 -47 577 -129 183 -370 271 -595 217z"/>
    </g>
  </SvgIcon>
);

export default function Header() {
  let location = useLocation();
  const [{ searchVisibility }] = useContext(LayoutContext);
  const { loggedIn } = useContext(AuthContext);
  const { width } = useWindowSize();
  const [state, setState] = useState(false);
  const sidebarHandler = () => {
    setState(!state);
  };
  const headerType = location.pathname === '/' ? 'transparent' : 'default';

  return (
    <HeaderWrapper>
      <Sticky
        top={headerType === 'transparent' ? -1 : 0}
        innerZ={10001}
        activeClass="isHeaderSticky"
      >
        <>
        {width > 991 ? (
          <Navbar
            logo={
              <>
                {headerType === 'transparent' && <LogoIcon />}
                <Logo
                  withLink
                  linkTo="/"
                  src="/images/logotipo_2.png"
                  title="HigoViagens"
                />
              </>
            }
            navMenu={<MainMenu />}
            authMenu={<AuthMenu />}
            isLogin={loggedIn}
            // avatar={<Logo src={avatarImg} />}
            profileMenu={<ProfileMenu avatar={<Logo src={avatarImg} />} />}
            headerType={headerType}
            searchComponent={<NavbarSearch />}
            location={location}
            searchVisibility={searchVisibility}
          />
        ) : (
          <MobileNavbar className={headerType}>
            <LogoArea>
              <>
                {headerType === 'transparent' && <LogoIcon />}
                <Logo
                  withLink
                  linkTo="/"
                  // src="/images/logotipo_2.png"
                  title="HigoViagens"
                />
              </>
              <NavbarSearch />
            </LogoArea>
            <Button
              className={`hamburg-btn ${state ? 'active' : ''}`}
              onClick={sidebarHandler}
            >
              <span />
              <span />
              <span />
            </Button>
            <Drawer
              placement="right"
              closable={false}
              onClose={sidebarHandler}
              width="285px"
              className="mobile-header"
              open={state}
            >
              <CloseDrawer>
                <button onClick={sidebarHandler}>
                  <IoIosClose />
                </button>
              </CloseDrawer>
              {loggedIn ? (
                <AvatarWrapper>
                  <AvatarImage>
                    <Logo src={avatarImg} />
                  </AvatarImage>
                  <AvatarInfo>
                    <Text as="h3" content="Nova Scotia" />
                    <TextLink
                      link={AGENT_PROFILE_PAGE}
                      content="View Profile"
                    />
                  </AvatarInfo>
                </AvatarWrapper>
              ) : (
                <AuthMenu className="auth-menu" />
              )}
              <MobileMenu className="main-menu" />
            </Drawer>
          </MobileNavbar>
        )}
        </>
      </Sticky>
    </HeaderWrapper>
  );
}
