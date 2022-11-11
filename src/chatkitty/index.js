import ChatKitty from 'chatkitty';

export const kitty = ChatKitty.getInstance(
  '0499be87-115d-4382-ba4b-77958c3dcd1a'
);

export function getChannelDisplayName(channel) {
  if (channel.type === 'DIRECT') {
    return channel.members.map((member) => member.displayName).join(', ');
  } else {
    return channel.name;
  }
}
