import React from 'react';
import ListBlogs  from './ListBlogs';
export default class AppBlogs extends React.Component {
    constructor(props) {
        super(props);

    }
    
    render(){
    return (
        <main>
        {this.props.error}
        <ListBlogs blogs={this.props.blogs} updateBlogs={this.props.updateBlogs}/>
        <div id="go1" onClick={this.props.changeBlogs} class={this.props.blogs.length != 0 && !this.props.from_search && !this.props.is_max ? "open" : "close"}>
          Прогрузить дальше
        </div>
        <div id="go2" onClick={this.props.handleChoiceClick} class={this.props.blogs.length != 0 && this.props.from_search && !this.props.is_max ? "open": "close"}>
          Прогрузить дальше
        </div>
        <div class={this.props.to_start ? "open" : "close"} onClick={this.props.changeBlogs}>
          На стартовую
        </div>
        
       </main>
    )
    }
}