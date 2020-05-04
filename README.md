# Technical Questions

## 1
I have probably put in 5 hours of coding time. Alot of the time was wasted on troubleshooting bugs.
If I had more time, I would improve on the look and feel of the interface. I would add more error control handling.

## 2

The most must useful feature that was added to the Javascript language would be template literals and arrow functions.

```
  applySearch = (e) => {
    e.preventDefault()
    this.props.fetchRestaurants({
      url: `${config.apiEndpoint}/restaurants?city=${this.props.selectedCity}`, 
      refineSearch: this.props.refineSearch,
      postalCode: this.props.postalCode
    })
  }
```

##3
Performance issues can be monitored with various tools like Google's PageSpeed Insights. I do not often have to monitor issues on the production server unless it's a major bug issue.

##4
The API should allow more options to filter the data. It was not possible to use the API to partially query the records by either name, address, and area.
I had to filter it on the client side. It would be alot better if it was implement with graphql because the data can be explicitly requested.

##5
```
{
  "firstName": "Jim",
  "lastName": "Kung"
  "location": "Pickering",
  "characteristics": [
    "Respectful",
    "Team player",
    "Skilled",
    "Friendly",
    "Creative",
    "Commited"
  ],
  "passions": [
    "Programming",
    "Volleyball",
    "graphics"
  ],
  "interests": [
    "3D",
    "cooking",
    "gardening",
    "drawing and painting",
    "fishing",
    "camping"
  ]
}
```