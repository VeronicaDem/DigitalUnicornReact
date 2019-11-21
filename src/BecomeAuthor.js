import React from 'react';
import Header from './Header';
import Error from './Error';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;
    var hh = date.getHours();
    if(hh < 10) hh = '0' + hh;
    var min = date.getMinutes();
    if(min < 10) min = '0' + min;
    var ss = date.getSeconds();
    if(ss < 10) ss = '0' + ss;
    return yy+"-"+mm+"-"+dd + " " + hh + ":" + min + ":" + ss;
  }
export default class BecomeAuthor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            imagesToPost:{},
            imagesUrl:{}
        }
        this.triggerInputFile = this.triggerInputFile.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postBlog = this.postBlog.bind(this);
    }
    handleClick(e) {
        /* обработать количество посылаемых данных*/
        let reader = new FileReader();
        let file = e.target.files[0];
        console.log(file);
        let imagesToPost = {};
        let imagesUrl = {};
        reader.onloadend = ()=> {
            imagesToPost = Object.assign({}, this.state.imagesToPost);
            imagesUrl = Object.assign({},this.state.imagesUrl);
            imagesToPost[this.props.login + "_" + file.name] = file;
            imagesUrl[this.props.login + "_" + file.name] = reader.result;
            this.setState({
                imagesUrl:imagesUrl,
                imagesToPost:imagesToPost
            })
        }
        reader.readAsDataURL(file);
    }
    triggerInputFile() {
         this.fileInput.click();
    }
    handleRemove(result) {
      console.log(result);
      let imagesToPost = Object.assign({}, this.state.imagesToPost);
      delete imagesToPost[result];
      let imagesUrl = Object.assign({}, this.state.imagesUrl);
      delete imagesUrl[result];
      
      this.setState({
          imagesToPost,
          imagesUrl
      })
    }

    async postBlog() {
        /* Если уже есть такие изображения, то игнорировать добавление*/
        let imagesToPost = {};
        let imagesUrl = {};

        Object.keys(this.state.imagesToPost).map((key)=> {
            let newKey = key + "_" + (formatDate(new Date()));
           imagesToPost[newKey] = this.state.imagesToPost[key];
           imagesUrl[newKey] = this.state.imagesUrl[key];
        })
        axios.post(`files/addImages?imagesToPost=${imagesToPost}&imagesUrl=${imagesUrl}`)
              .then(()=>{
                  this.setState({
                      error:null,
                     
                  })
              })
              .catch((error)=>{
                 this.setState({
                     error:error.message,
                     imagesToPost:{},
                      imagesUrl:{}
                 })
                 return;
             });
        let images = {
            "img1": null,
            "img2":null,
            "img3":null
        }
        Object.keys(this.state.imagesToPost).map((key)=>{
            if(!images["img1"]) {
                images["img1"] = key;
            }
            else if(!images["img2"]) {
                images["img2"] = key;
            }
            else {
                images["img3"] = key;
            }
        });
        let postForm = document.forms["postForm"];

        let JSON = {
            images,
            "article_title": postForm.nameOfPublication.value,
            "post_text":postForm.bodyOfPublication.value,
            "login_fk": this.props.login,
            "post_description":"",
            post_time:formatDate(new Date())
        }
        let answer;
        let errBeforePost = null;
        
        axios.post(`/article(body=${JSON})`)
             .then(() => {
                 errBeforePost = null;
                 this.setState({
                     error:null,
                     imagesToPost:{},
                      imagesUrl:{},
                      allright:true
                 })
             })
             .catch((error) => {
                 this.setState({
                     error:"Повторите отправку еще раз",
                     imagesToPost:{},
                      imagesUrl:{},
                      allright:false
                 })
                 errBeforePost = error;
                 
             });
      
       
        

    }
    handleSubmit(e) {
      if(Object.keys(this.state.imagesToPost).length > 3) {
          
          this.setState({
              error:"Нельзя отправить больше 3 изображений"
          })
          e.preventDefault();
          return;
      }
      this.postBlog();
      e.preventDefault();
    }
    render() {
        let error = "";
        if(this.state.error) {
            error = (
                <Error error={this.state.error} />
            )
        }
        let all = ""; 
        if(this.state.allright) {
            all = (
                <Redirect to="/" />
            )
        }
        return (
            <main class="BecomeAuthor">
		{error}
		<div class="BecomeAuthor_content">
			<form onSubmit={this.handleSubmit} name="postForm">
		<div class="name_of_publication_container">
			<input type="text" required name="nameOfPublication" class="publication_name_text" placeholder="Название статьи..."/>
		</div>
		<div class="text_of_publication_container">
			<button type="button" onClick={this.triggerInputFile} class={"screpka"} name="screpka" ><img src="images/logo/Screpka.png" alt=""/></button>
			<textarea type="text" required name="bodyOfPublication" class="publication_text" placeholder="Введите текст статьи..."></textarea>
		</div>
		<div class="sign_up_button_container">
			<input type="submit" value="Готово" class="button_submit"/>
		</div>
        <input type="file" id="file" ref={fileInput => this.fileInput = fileInput} hidden={true} onChange={(e)=>{this.handleClick(e)}} />
		</form>
        <div class="becomeAuthor_images">
            {Object.keys(this.state.imagesUrl).map((key)=>{
                return (
                    <div class="image">
                        
                    <img src={this.state.imagesUrl[key]} width="100" height="100"/>
                    <div class="remove_img" onClick={(e)=>{this.handleRemove(key)}}>
                        Удалить
                    </div>
                    </div>
                )
            })}
        </div>
		</div>
		{all}
	    </main>

        )
    }
}