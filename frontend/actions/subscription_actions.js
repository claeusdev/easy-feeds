import * as SubscriptionApiUtil from '../util/subscription_api_util';

// export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ALL_SUBSCRIPTIONS = 'RECEIVE_ALL_SUBSCRIPTIONS';
export const REMOVE_FEED = 'REMOVE_FEED';
export const RECEIVE_FEED = 'RECEIVE_FEED';

export const receiveAllSubscriptions = feedsPayload => ({
  type: RECEIVE_ALL_SUBSCRIPTIONS,
  feeds: feedsPayload.feeds,
  subscriptions: feedsPayload.subscriptions
});

export const removeFeed = feedId => ({
  type: REMOVE_FEED,
  feedId
});

export const receiveFeed = feedPayload => ({
  type: RECEIVE_FEED,
  feed: feedPayload.feed,
  subscription: feedPayload.subscription
});

export const receiveFeedErrors = errors => ({
  type: RECEIVE_FEED_ERRORS,
  errors
})

export const fetchAllSubscriptions = () => dispatch => (
  SubscriptionApiUtil.fetchSubscriptions()
    .then(subscriptionsPayload =>
      dispatch(receiveAllSubscriptions(subscriptionsPayload))
    )
);

export const deleteFeed = feed => dispatch => (
  SubscriptionApiUtil.deleteSubscription(feed.subscription_id)
    .then(() => dispatch(removeFeed(feed.id)))
);

export const updateFeed = feed => dispatch => {
  const subscription = {
    title: feed.subscription_title,
    id: feed.subscription_id
  };
  return SubscriptionApiUtil.updateSubscription(subscription)
    .then((updatedFeed) => dispatch(receiveFeed(updatedFeed))),
    errors => dispatch(receiveFeedErrors(errors.responseJSON));
};

export const createFeed = feed => dispatch => {
  return (
    SubscriptionApiUtil.createFeed(feed)
      .then((newFeed) => dispatch(receiveFeed(newFeed)))
  );
};