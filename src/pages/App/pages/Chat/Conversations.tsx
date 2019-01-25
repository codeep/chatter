import React, { Component } from 'react';
import { connect } from 'react-redux';

import { renderRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';

import { conversations } from 'store';

import AvatarRenderer from 'components/AvatarRenderer';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';

import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) => ({
});

class Conversations extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentInterlocutorId: null,
      currentInterlocutor: null,
      conversationsList: [],
    };
  }

  componentDidMount() {
    const { fetchConversationsList, socket } = this.props;

    socket.on('server:chat:new-message', ({ message }: any) => {
      const { conversationsList, conversationsList: { [message.conversationId]: destConv } } = this.state;

      if (conversationsList && destConv) {
        conversationsList[message.conversationId] = {
          ...destConv,
          unread: destConv.unread + 1,
          lastMessage: message,
        };

        this.setState({
          conversationsList,
        });
      }
    });

    fetchConversationsList()
      .then(({ response: { entities: { conversations }, result } }: any) => {
        const lastConversation = conversations[result[0]];
        const interloc = lastConversation.interlocutor;

        this.setState({
          conversationsListIds: result,
          conversationsList: conversations,
          currentInterlocutorId: interloc.id,
          currentInterlocutor: interloc,
        });
      });
  }

  render() {
    const { conversationsList, conversationsListIds, currentInterlocutorId, currentInterlocutor } = this.state;

    return (
      <>
        <Hidden only="xs">
          <Grid item sm={4} md={4}>
            <List>
              { conversationsListIds && conversationsListIds.map((id: number) => {
                const {
                  interlocutor,
                  interlocutor: {
                    firstName,
                    lastName,
                  },
                  lastMessage: {
                    text,
                  },
                } = conversationsList[id];

                return <Link key={id} to={`/chat/${id}`}>
                  <ListItem>
                    <ListItemAvatar>
                      <AvatarRenderer user={interlocutor} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${firstName} ${lastName}`}
                      secondary={text}
                    />
                  </ListItem>
                </Link>;
              })}
            </List>
          </Grid>
        </Hidden>
        {
          currentInterlocutorId && currentInterlocutor && renderRoutes(this.props.route.routes, {
            socket: this.props.socket,
            currentInterlocutorId,
            currentInterlocutor,
          })
        }
      </>
    );
  }
}

const mapStateToProps = ({}: any) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchConversationsList: () => dispatch(conversations.fetchList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Conversations));
