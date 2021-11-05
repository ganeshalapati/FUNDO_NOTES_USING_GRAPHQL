let cars = [
    {
      "color": "purple",
      "type": "minivan",
      "registration": new Date('2017-01-03'),
      "capacity": 7
    },
    {
      "color": "red",
      "type": "station wagon",
      "registration": new Date('2018-03-03'),
      "capacity": 5
    },
  {
   "color": "red",
   "type": "cabrio",
   "registration": new Date('2016-05-02'),
   "capacity": 2
  }
  ]
  const total = cars.capacity();
  console.log(total);