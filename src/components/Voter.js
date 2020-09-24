import React, { Component } from "react";
import Card from './Card';
import ChannelHeader from './ChannelHeader';

import Ably from './../ably';

class Voter extends Component {
  constructor(props) {
    super(props);

    this.handleVote = this.handleVote.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);

    this.deckValues = [0, 0.5, 1, 2, 3, 5, 8, 13]

    this.state = {
      vote: null,
    };
  }

  componentDidMount() {
    this.setupChannel();
  }

  setupChannel = () => {
    this.channel = Ably.channels.get(this.props.channelUuid);

    this.channel.attach();
    this.channel.subscribe((msg) => this.handleSubscribe(msg));
    this.channel.once("attached", () => this.channel.presence.enter({
      name: this.props.memberName,
    }));
  }

  handleSubscribe(msg) {
    if (msg.name === 'reset') {
      this.setState({ vote: null });
    }
  }

  handleVote(vote) {
    this.setState({ vote });
    this.channel.publish('add_vote', { vote });
  }

  render() {
    return (
      <div className="has-text-centered">
        <div>
          <ChannelHeader channelUuid={this.props.channelUuid} />
        </div>
        <div>
          { this.props.memberName }
        </div>

        {this.deckValues.map((value) => (
          <div className="column" onClick={(e) => this.handleVote(0, e)} >
            <Card value={value} isSelected={this.state.vote === value} />
          </div>
        ))}
      </div>
    );
  }
}

export default Voter;
