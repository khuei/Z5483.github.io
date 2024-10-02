import React, { useEffect } from 'react';
import { Box, ImageList, ImageListItem, ImageListItemBar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function MasonryGallery() {
    const theme = useTheme();

    const isXl = useMediaQuery(theme.breakpoints.up('xl')); // screens 1920px and up
    const isLg = useMediaQuery(theme.breakpoints.up('lg')); // screens 1280px and up
    const isMd = useMediaQuery(theme.breakpoints.up('md')); // screens 960px and up
    const isSm = useMediaQuery(theme.breakpoints.up('sm')); // screens 600px and up

    const getColumns = () => {
        if (isXl) return 4;
        if (isLg) return 3;
        if (isMd) return 2;
        if (isSm) return 1;
        return 1;
    };

    useEffect(() => {
        document.title = 'Hobby — Khue Nguyen';
    });

    return (
        <center>
        <Box sx={{
            width: '95dvw',
                overflowY: 'scroll',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
        }}>
        <ImageList variant="masonry" cols={getColumns()} gap={30}>
        {itemData.map((item) => (
            <ImageListItem
            key={item.img}
            sx={{
                transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        cursor: 'pointer',
                    }
            }}
            >
            <img
            srcSet={`${item.img}?w=248&h=372&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&h=372&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
            />
            <ImageListItemBar
            position="below"
            title={item.title}
            sx={{
                '.MuiImageListItemBar-title': {
                    fontSize: '1.2rem',
                },
            }}/>
            </ImageListItem>
        ))}
        </ImageList>
        </Box>
        </center>
    );
}

const itemData = [
    {
        img: 'https://i.pinimg.com/originals/86/d7/91/86d791237d2b85207881287c8d7a9342.jpg',
        title: 'NYC TO PARIS',
    },
    {
        img: 'https://i.pinimg.com/originals/08/1a/62/081a629d126645a495172c45cf299527.jpg',
        title: 'SHATTERED BACKBOARD',
    },
    {
        img: 'https://i.pinimg.com/originals/9e/85/6e/9e856e4fd376703b48b370024975c03a.jpg',
        title: 'ESPRESSO',
    },
    {
        img: 'https://i.pinimg.com/originals/80/72/4b/80724bc9595af6c5e9d8ab06075cea35.jpg',
        title: 'CHICAGO BLUE',
    },
    {
        img: 'https://i.pinimg.com/originals/a6/82/64/a68264b9e6eeb383e607e1ac44eeba88.jpg',
        title: 'METALLIC BLACK',
    },
    {
        img: 'https://i.pinimg.com/originals/19/89/5d/19895d4c9cae754e1584a8df472f0077.jpg',
        title: 'PROTOTYPE',
    },
    {
        img: 'https://i.pinimg.com/originals/79/48/00/794800b07ca77bae0d3996eb54db8f18.jpg',
        title: 'DECONSTRUCTED',
    },
    {
        img: 'https://i.pinimg.com/originals/cc/b5/80/ccb580e06976366b0ebf47c65df23a49.jpg',
        title: 'CHICAGO X SHATTERD BACKBOARD',
    },
];
