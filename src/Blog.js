import React from 'react';
import axios from 'axios';
import Error from './Error';
function toStringDate(date) {
    let d = new Date(date);
    
    let day = d.getDate();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let formed = "";
    
    if(day == new Date().getDate()) {
       formed += "Сегодня"
    }
    else if(day + 1 ==  (new Date().getDate())) {
        formed += "Вчера";
    }
    else formed += day + ":" + month + ":" + year;
    formed += " в " + d.getHours() + ":" + d.getMinutes();
    return formed;
}
export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "likes": this.props.likes,
            "dislikes" : this.props.dislikes,
            "like_been": false,
            "dislike_been":false
        }
        this.handleLikes = this.handleLikes.bind(this);
        this.handleDislikes = this.handleDislikes.bind(this);
    }
 async handleDislikes() {
     
     /*if(this.state.dislike_been) {
         this.setState({
             "dislikes": this.state.dislikes - 1,
             "dislike_been": false
         })
     }
     else {
         this.setState({
             "dislikes": this.state.dislikes + 1,
             'dislike_been' : true
         })
     }*/
     /* вставить новые значения dislike и like в бд*/
 }
  async handleLikes() {
      axios.post(`/articles/likes?post_id=${this.props.post_id}&login=${this.props.login}`)
           .catch((error)=>{
              this.setState({
                  error:error.message
              })
           });
      this.props.updateBlogs();
      /*if(this.state.like_been) {
           this.setState({
               "likes": this.state.likes - 1,
               "like_been": false
           })
       }
       else {
           this.setState({
               "likes": this.state.likes + 1,
               "like_been": true
           })
       }*/
       
   }
   async handleLikes() {
    axios.post(`/articles/dislikes?post_id=${this.props.post_id}&login=${this.props.login}`)
         .catch((error)=>{
            this.setState({
                error:error.message
            })
         });
    this.props.updateBlogs();
    /*if(this.state.like_been) {
         this.setState({
             "likes": this.state.likes - 1,
             "like_been": false
         })
     }
     else {
         this.setState({
             "likes": this.state.likes + 1,
             "like_been": true
         })
     }*/
     
 }

    render() {
        let error = "";
        if(this.state.error) {
            error = (
                <Error error={this.state.error} />
            )
        }
        return (
            <div class="blog_container">
                {error}
                                <div class="blog_cover">
					
				
                    <div class="blog_body">
                        <div class="blog_title">
                    <h1><a href="#">{this.props.article_title}</a></h1>
                        </div>
                        <div class="blog_text">
                            {this.props.post_text}
                        </div>
                        {
                        this.props.images.map((elem) => {
                             return (<div class="img_container">
                                <img src={elem.src} alt=""/> 
                             </div>
                             )
                        })
                         }
                       
                        
                    </div>
                    <div class="button_container">
                        <input type="button" name="read_more" value="Читать далеe" class="button" />
                    </div>
        
                    <div class="blog_footer">
                        <div class="like_dislike_container">
                            <div class="like_container_flex_cover">
                                <div class="like_container">
                                <button type="button" name="like_button" onClick={this.handleLikes}> <img src="images/yes.png" alt=""/> </button>
                                    <span>+</span>
                                    <p>{this.state.likes}</p>
                                </div>
                            </div>
                            <div class="dislike_container_flex_cover">
                                <div class="dislike_container">
                                <button type="button" name="dislike_button" onClick={this.handleDislikes}>	<img src="images/no.png" alt=""/> </button>
                                    <span>-</span>
                                    <p>{this.state.dislikes}</p>
                                </div>
                            </div>
                        </div>
                        <div class="empty_space"></div>
                        <div class="author_container">
                            <div class="author_login_time_container">
                                <p class="author_login">{this.props.login}</p>
                                <p class="author_time">{toStringDate(this.props.when.replace(" ","T"))}</p>
                            </div>
                            <div class="author_image_container">
                                <img class="author_image" src={this.props.user_img} alt=""/>
                            </div>
                        </div>
                    </div>
        
                </div>
                
                            </div>
                            
        )
    }
}