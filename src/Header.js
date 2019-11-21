import React from 'react';
import Search from "./Search";
import {Link} from "react-router-dom";
/* сделать router для навигации*/ 
export default function Header(props) {
    let right = (
    <Link to={`/SignUp`}>
    <li class="sign_in">Войти</li>
    </Link>);
    if(props.login) {
        right = (
            <img class="float_right" src={!props.user_img ? "images/human.png" : props.user_img} alt=""/>
        )
        
    }
    return (
        <header>
            <div class="inner_header">
			<img class="logo" src="images/logo/Logo2.png" alt=""/>
			<div class="logo_container">
					<h1>Di<span>git</span>al Unicorn</h1>
			</div>
			<ul class="navigation">
				<a href="">
					<li>Публикации</li>
				</a>
				<a href="">
					<li>Новости</li>
				</a>
				<Link to={"/BecomeAuthor"}>
					<li>Стать автором</li>
				</Link>
				
				{right}
                <Search handleError={props.handleError} handleChoice = {props.handleChoice}/>
				
			</ul>
		  </div>
        </header>
    )
}