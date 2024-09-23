import React, { useEffect, useState } from 'react';
import { IoMdMail } from 'react-icons/io';
import { FaGithub } from 'react-icons/fa';

function IconLinks({ inputColor }) {
    return (
        <><li>
            <a href="mailto:hieukhue2276@gmail.com" className="image-anchor" style={{ color: inputColor }}>
                <center><IoMdMail size='4em' /></center>
                <span className="image-subscript">Email</span>
            </a>
        </li>
        <li>
            <a href="https://github.com/khuei" className="image-anchor" style={{ color: inputColor }}>
                <center><FaGithub size='4em' /></center>
                <span className="image-subscript">Github</span>
            </a>
        </li></>
    );
}

export default IconLinks;
