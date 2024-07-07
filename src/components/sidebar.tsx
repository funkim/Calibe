const categoryMapping = {
    Men: "men's clothing",
    Women: "women's clothing",
    Accessories: 'jewelery',
}

const reverseCategoryMapping = Object.fromEntries(
    Object.entries(categoryMapping).map(([k, v]) => [v, k])
)

interface SidebarProps {
    categories: string[]
    selectedCategory: string | null
    setSelectedCategory: (category: string | null) => void
    minRating: number
    setMinRating: (rating: number) => void
}

export const Sidebar: React.FC<SidebarProps> = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    minRating,
    setMinRating,
}) => {
    return (
        <div className="z-20 mt-5 w-64 bg-white p-4 font-body shadow md:ml-10">
            <h2 className="mb-4 text-lg font-semibold">Filters</h2>
            <div className="mb-6">
                <h3 className="text-md mb-2 font-medium">Category</h3>
                <div>
                    <button
                        className={`mb-1 ${selectedCategory === null ? 'font-bold' : ''}`}
                        onClick={() => setSelectedCategory(null)}
                    >
                        All
                    </button>
                    {Object.keys(categoryMapping).map((category) => (
                        <button
                            key={category}
                            className={`mb-1 block ${selectedCategory === category ? 'font-bold' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-md mb-2 font-medium">Minimum Rating</h3>
                <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    className="w-full"
                />
                <span>{minRating} stars</span>
            </div>
        </div>
    )
}
