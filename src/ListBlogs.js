import React from 'react';
import Blog from './Blog';



export default class ListBlogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
        }
    }

    render() {
        return (
            <div class="content">
                {
                    this.props.blogs.map(function(elem) {
                        
                        return (
                            <Blog article_title={elem.article_title} 
                                  post_text={elem.post_text}
                                  images={elem.images}
                                  likes={elem.likes}
                                  dislikes={elem.dislikes}
                                  login={elem.login}
                                  when={elem.post_time}
                                  user_img={elem.user_img}
                                  post_id={elem.post_id}
                                  post_description={elem.post_description}
                                  post_time={elem.post_time}
                                  updateBlogs={this.props.updateBlogs}
                            />         
                        )
                    })
                }
            </div>
        )
    }
}