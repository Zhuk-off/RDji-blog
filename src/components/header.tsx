import { IWPMenuItem } from '@/interfaces/footerHeaderRestAPIDataResponse';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import logo from '/public/RDji_logo.svg';
import {
  Drawer,
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  Box,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'] });

export const Header1 = ({
  headerItemsMenuLeft,
  headerItemsMenuRight,
}: {
  headerItemsMenuLeft: IWPMenuItem[];
  headerItemsMenuRight: IWPMenuItem[];
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  return (
    <header className="w-full">
      <menu
        className="hidden md:flex justify-between items-center flex-nowrap whitespace-nowrap
      font-bold text-base p-10"
      >
        {headerItemsMenuLeft.map((itemMenu) => (
          <Link
            href={itemMenu.node.uri}
            key={itemMenu.node.id}
            className="uppercase text-white text-opacity-70 hover:text-opacity-100 transition"
          >
            {itemMenu.node.label}
          </Link>
        ))}
        <Link href={'/'}>
          <Image src={logo} alt={'RDji_logo'} width={100} height={100} className='opacity-80 hover:opacity-100 transition'/>
        </Link>
        {headerItemsMenuRight.map((itemMenu) => (
          <Link
            href={itemMenu.node.uri}
            key={itemMenu.node.id}
            className="uppercase text-white text-opacity-70 hover:text-opacity-100 transition"
          >
            {itemMenu.node.label}
          </Link>
        ))}
      </menu>
      <menu className="flex justify-between md:hidden pt-4">
        <li>
        <Link href={'/'} className='block'>
          <Image src={logo} alt={'RDji_logo'} width={100} height={70} className='opacity-80 ml-2'/>
        </Link>
        </li>

        <li>
          <Drawer
            anchor={'right'}
            open={menuIsOpen}
            onClose={() => setMenuIsOpen(false)}
            PaperProps={{
              sx: {
                backgroundColor: '#3E3B4A',
              },
            }}
          >
            <Box
              role="presentation"
              onClick={() => setMenuIsOpen(false)}
              onKeyDown={() => setMenuIsOpen(false)}
            >
              <List>
                {headerItemsMenuLeft.map((item) => (
                  <Link key={item.node.id} href={item.node.uri}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText
                          className={openSans.className}
                          sx={{
                            color: 'white',
                            opacity: '70%',
                            textTransform: 'uppercase',
                          }}
                        >
                          <span className={openSans.className}>
                            {item.node.label}
                          </span>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                ))}
                {headerItemsMenuRight.map((item) => (
                  <Link key={item.node.id} href={item.node.uri}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText
                          className={openSans.className}
                          sx={{
                            color: 'white',
                            opacity: '70%',
                            textTransform: 'uppercase',
                          }}
                        >
                          <span className={openSans.className}>
                            {item.node.label}
                          </span>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Box>
          </Drawer>
        </li>
        <li>
          <IconButton
            className=""
            size="large"
            aria-label="menu"
            onClick={() => setMenuIsOpen(true)}
          >
            <MenuIcon
              fontSize="large"
              sx={{ color: 'white', opacity: '70%' }}
            />
          </IconButton>
        </li>
      </menu>
    </header>
  );
};
