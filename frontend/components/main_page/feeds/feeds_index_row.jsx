import React from 'react';

class FeedsIndexRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({ renaming: false }, this.props.feed);
    this.handleEditChange = this.handleEditChange.bind(this);
  }

  handleEdit() {
    return e => {
      this.props.updateFeed(this.state);
      this.state.renaming = false;
    };
  }

  handleEditChange(e) {
    this.setState({subscription_title: e.target.value});
  }

  handleDelete(feed) {
    return e => this.props.deleteFeed(feed);
  }

  subscriptionTitleForm(feed) {
    return (
      this.state.renaming ?
      <div className="feed-rename">
        <form
          onSubmit={this.handleEdit()}>
          <input type="text"
            value={this.state.subscription_title}
            onChange={e => this.handleEditChange(e)}
            />
          <button>&#10004;</button>
        </form>
      </div>
      : feed.subscription_title
    );
  }

  render() {
    const { feed } = this.props;
    return (
      <tr>
        <td>
          <img src={feed.image_url} className="feed-index-icon"/>
          {this.subscriptionTitleForm(feed)}
        </td>
        <td className="feed-status-text">{feed.status}</td>
        <td className="feed-modify-cell">
          <button className="feed-rename-button"
            onClick={e => this.setState(
              { renaming: true }
            )}>
            Rename
          </button>
          <button className="feed-delete-button"
            onClick={this.handleDelete(feed)}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default FeedsIndexRow;