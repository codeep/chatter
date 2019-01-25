import React from 'react';

import Avatar from '@material-ui/core/Avatar';

type Props = {
  user: {
    avatar?: string;
    firstName: string;
    lastName: string;
  };
};

const AvatarRenderer = (props: Props) => {
  const { user: { avatar, firstName, lastName } } = props;

  return (
    <Avatar src={avatar} {...props}>
      {`${firstName[0]}${lastName[0]}`.toUpperCase()}
    </Avatar>
  );
};

export default AvatarRenderer;
