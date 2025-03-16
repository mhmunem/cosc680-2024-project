import db from '../../db/connection/pool'
import { category } from '../../db/schema/category'

const insertCategories = async (categoryNames: any) => {
    for (const categoryName of categoryNames) {
        try {
            await db.insert(category)
                .values({ name: categoryName })
                .onConflictDoUpdate({
                    target: category.name,
                    set: {
                        name: categoryName,
                    },
                })
        } catch (error) {
            console.error(`Error inserting category ${categoryName}:`, error)
        }
    }
}

export default insertCategories
