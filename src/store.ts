export interface Item {
  id: number;
  owner: {
    avatar_url: string;
  };
  description: string;
}

export interface DefaultState {
  users: Item[];
  addLikedCards: Item[];
  createdCards: Item[];
  filteredListItems: Item[];
}
export interface GetUsersCards {
  type: "GET_PRODUCTS";
  payload: Item[];
}
export interface DeleteUsersCard {
  type: "DELETE_PRODUCTS";
  payload: string;
}
export interface DeleteLikedCards {
  type: "DELETE_LIKED_CARDS";
  payload: string;
}

export interface AddLikedCards {
  type: "ADD_LIKED_CARDS";
  payload: Item;
}
export interface AddCreatedCards {
  type: "CREATED_CARDS";
  payload: Item;
}
export interface AddFilteredListItems {
  type: "ADD_FILTERED_LIST-ITEMS";
  payload: string;
}

const initialState: DefaultState = {
  users: [],
  addLikedCards: [],
  createdCards: [],
  filteredListItems: [],
};
type ActionType =
  | GetUsersCards
  | DeleteUsersCard
  | AddLikedCards
  | DeleteLikedCards
  | AddCreatedCards
  | AddFilteredListItems;

export const reducer = (
  state: DefaultState = initialState,
  action: ActionType
): DefaultState => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, users: action.payload };

    case "DELETE_PRODUCTS":
      return {
        ...state,
        users: state.users.filter((item) => item.id !== +action.payload),
      };
    case "DELETE_LIKED_CARDS":
      return {
        ...state,
        addLikedCards: state.addLikedCards.filter(
          (item) => item.id !== +action.payload
        ),
      };
    case "ADD_LIKED_CARDS":
      const alreadyLiked = state.addLikedCards.some(
        (item) => item.id === action.payload.id
      );

      if (alreadyLiked) return state;
      return {
        ...state,
        addLikedCards: [...state.addLikedCards, action.payload],
      };

    case "CREATED_CARDS":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "ADD_FILTERED_LIST-ITEMS":
      return {
        ...state,
        filteredListItems: state.users.filter((item) =>
          item.description.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };

    default:
      return state;
  }
};
