export default async function fetchCampusInfo(id) {
  try {
    const response = await axios.get(`http://localhost:8080/api/campus/${id}`);
    const campusData = response.data.campus;
    setName(campusData.name);
    setImageUrl(campusData.imageUrl);
    setAddress(campusData.address);
    setDescription(campusData.description);
  } catch (error) {
    console.error(error);
  }
}
