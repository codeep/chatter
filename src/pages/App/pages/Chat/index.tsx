import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import InputRenderer from 'components/InputRenderer';
import AvatarRenderer from 'components/AvatarRenderer';

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const SendMessageSchema = yup.object().shape({
  message: yup.string()
    .required('Required'),
});

const styles = (theme: Theme) => ({
  chatBox: {
    height: 'calc(100% - 150px)',
    overflowY: 'scroll' as 'scroll',
  },
  chatMessageWrapper: {
    'padding': '0px 5px 10px',
    '&:last-child': {
      padding: '0px 5px 0px',
    },
  },
});

class Chat extends Component<any, any> {
  private chatBoxRef: any;
  private chatBoxWrapperRef: any;

  constructor(props: any) {
    super(props);

    this.chatBoxRef = React.createRef();
    this.chatBoxWrapperRef = React.createRef();

    this.state = {
      autoScroll: true,
      messages: [],
    };
  }

  onScrollChat = (e: any) => {
    const { target: { scrollTop, offsetHeight, scrollHeight } } = e;
    const autoScrollCond = scrollTop + offsetHeight + 20 > scrollHeight;

    this.setState({
      autoScroll: autoScrollCond,
    });
  }

  onSubmit = ({ message }: any, { resetForm }: any) => {
    const { currentUserId, currentInterlocutorId } = this.props;

    this.pushMessage({
      from: currentUserId,
      to: currentInterlocutorId,
      text: message,
    });
    resetForm();
  }

  pushMessage = (message: any) => {
    const { messages } = this.state;

    this.setState({
      messages: messages.concat(message),
    });
  }

  chatPosition = () => {
    const { current, current: { offsetHeight: wrapperHeight } } = this.chatBoxWrapperRef;
    const { current: { offsetHeight: height } } = this.chatBoxRef;

    if (wrapperHeight - height < 0) {
      current.scrollTo({top: height - wrapperHeight});
      current.style.paddingTop = '0px';
    } else {
      current.style.paddingTop = `${wrapperHeight - height}px`;
    }
  }

  componentDidMount() {
    const { socket, match: { params: { conversationId } } } = this.props;

    this.chatPosition();

    socket.on('server:chat:new-message', ({ message }: any) => {
      if (conversationId == message.conversationId) {
        this.pushMessage(message);
      }
    });
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const { autoScroll, messages } = this.state;
    const { currentUserId } = this.props;

    if (prevState.messages.length !== messages.length
      && (autoScroll || messages[messages.length - 1].from === currentUserId)) {
      this.chatPosition();
    }
  }

  render() {
    const { classes, currentUserId, currentUser, currentInterlocutor } = this.props;
    const { messages } = this.state;

    return (
      <Grid item xs={12} sm={8} md={8}>
        <div
          className={classes.chatBox}
          ref={this.chatBoxWrapperRef}
          onScroll={this.onScrollChat}
        >
          <div ref={this.chatBoxRef}>
            { currentInterlocutor && messages.map(({ from, text}: any, index: number) =>
              <Grid
                container
                classes={{ container: classes.chatMessageWrapper }}
                justify={ currentUserId === from ? 'flex-end' : undefined }
                key={index}
              >
                <Chip
                  avatar={<AvatarRenderer user={currentUserId === from ? currentUser : currentInterlocutor } />}
                  color={ currentUserId === from ? 'primary' : undefined }
                  label={text}
                />
              </Grid>,
            )}
          </div>
        </div>
        <Formik
          initialValues={{message: ''}}
          validationSchema={SendMessageSchema}
          onSubmit={this.onSubmit}
          render={({ values, handleChange, errors, touched }: any) => (
            <Form>
              <InputRenderer
                type="text"
                name="message"
                label="Type a message"
                value={values.message}
                errors={errors}
                touched={touched}
                handler={handleChange}
                inputProps={{
                  autoComplete: 'off',
                }}
                formControlProps={{
                  margin: 'normal',
                  fullWidth: true,
                }}
              />
              <FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Send
                </Button>
              </FormControl>
            </Form>
          )}
        />
      </Grid>
    );
  }
}

const mapStateToProps = ({ entities, users }: any) => ({
  currentUserId: users.current,
  currentUser: entities.users[users.current],
});

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Chat));