// flowConfig.js
import MessageNode from './nodes/MessageNode';
import OptionsNode from './nodes/OptionsNode';
import OptionNode from './nodes/OptionNode';
import SendEmailNode from './nodes/SendEmailNode';
import CarouselNode  from './nodes/CarouselNode';
import SendImageNode from './nodes/SendImageNode';
import SendVideoNode from './nodes/SendVideoNode';
import HumanTakeoverNode from './nodes/HumanTakeoverNode';
import SendDocumentNode from './nodes/SendDocumentNode';
import FeedbackNode from './nodes/FeedbackNode';
import UserDetailsNode from './nodes/UserDetailsNode';
import QueryNode from './nodes/QueryNode';
import DecisionNode from './nodes/DecisionNode';

export const nodeTypes = {
  message: MessageNode,
  options: OptionsNode,
  option: OptionNode,
  sendEmail: SendEmailNode,
  carousel: CarouselNode,
  sendImage: SendImageNode,
  sendVideo: SendVideoNode,
  humanTakeover: HumanTakeoverNode,
  sendDocument: SendDocumentNode,
  feedback: FeedbackNode,
  userDetails: UserDetailsNode, 
  query: QueryNode,
  decision: DecisionNode,
};