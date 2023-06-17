export interface Location {
  id: number;
  name: string;
  robot?: {
    id: string;
    is_online: boolean;
  };
}

export const locations: Location[] = [
  {
    id: 0,
    name: "Spicy restaurant",
    robot: {
      id: "abcde123",
      is_online: true,
    },
  },
  {
    id: 1,
    name: "Salty restaurant",
  },
  {
    id: 2,
    name: "Spicy restaurant2",
    robot: {
      id: "abcde1234",
      is_online: true,
    },
  },
  {
    id: 3,
    name: "Salty restaurant2",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
  {
    id: 4,
    name: "Spicy restaurant3",
    robot: {
      id: "abcde123",
      is_online: true,
    },
  },
  {
    id: 5,
    name: "Salty restaurant3",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
  {
    id: 6,
    name: "Spicy restaurant4",
    robot: {
      id: "abcde123",
      is_online: true,
    },
  },
  {
    id: 7,
    name: "Salty restaurant4",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
  {
    id: 8,
    name: "Spicy restaurant5",
    robot: {
      id: "abcde123",
      is_online: true,
    },
  },
  {
    id: 9,
    name: "Salty restaurant5",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
  {
    id: 10,
    name: "Spicy restaurant6",
    robot: {
      id: "abcde123",
      is_online: true,
    },
  },
  {
    id: 11,
    name: "Salty restaurant6",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
  {
    id: 12,
    name: "Spicy restaurant7",
    robot: {
      id: "abcde123",
      is_online: true,
    },
  },
  {
    id: 13,
    name: "Salty restaurant7",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
];
