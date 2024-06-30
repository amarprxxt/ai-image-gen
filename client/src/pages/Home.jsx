import React, {useState, useEffect} from 'react'
import {Loader, Card, FormField} from '../components'


const RenderCards = ({data, title}) => {
  if(data?.length > 0) {
    return data.map((post) => <Card key ={post._id} {...post} />)
}

return (
  <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
)
}
const Home = () => {
  const[loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] =useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] =useState([]);

  useEffect(() => {
    const fetchPosts = async() => {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json',
          },
        })

        if(response.ok)
          {
            const result = await response.json();

            setAllPosts(result.data.reverse());
          }
      } catch(error) {
        alert(error)
      } finally {
       setLoading(false);
      }
    }
    fetchPosts();
  }, []);

/*const handleSearchChange =(e) => {
  clearTimeout(searchTimeout);
  setSearchText(e.target.value);

  setSearchTimeout(
  setTimeout(() => {
    const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));

    setSearchResults(searchResults);
  }, 500)
);
}*/

const handleSearchChange = (e) => {
  const searchTerm = e.target.value;
  setSearchText(searchTerm);

  if (searchTerm) {
    const searchResults = allPosts.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.prompt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedResults(searchResults);
  } else {
    setSearchedResults([]);
  }
};

  return (
    <div>
      <section className="max-w-7xl mx-auto">
        <div>
          <h1 className="font-extrabold text-[#000000] text-[32px]">Our Creative Community</h1>
          <p className="mt-2 text-[#000000] text-[14px] max-w[500px]">Users generated these images on my website & shared them on the community.</p>
          <p className="mt-1 text-[#000000] text-[14px] max-w[500px]">Now its your turn! Generate some creative images and share them with others! Cheers!</p>
          <p></p>
          <p className="mt-2 text-[#666e75] text-[14px] max-w[500px]">(Hover over any image to download it, view who generated it and what prompt did they exactly use!)</p>
        </div>

        <div className="mt-16">
          <FormField 
          LabelName="Search posts"
          type="text"
          name="text"
          placeholder="Search any created posts by our users"
          value={searchText}
          handleChange={handleSearchChange}
          />
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader/>
            </div>
          ) : (
            <>
            {searchText && (
              <h2 className="font-medium text-[S#666e75] text-xl mb-3">
                Showing results for <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gaps-3">
              {searchText ? (
              <RenderCards
            data={searchedResults}
            title = "No search results found"
        />
      ) : (
        <RenderCards
        data = {allPosts}
        title = "No Posts Found"
        />
      )}
      </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home