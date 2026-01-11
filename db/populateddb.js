const { Client } = require("pg");
require("dotenv/config");

const SQL = `
CREATE TABLE IF NOT EXISTS succulents (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 200 ) NOT NULL,
    species VARCHAR ( 200 ) NOT NULL,
    genus VARCHAR ( 200 ) NOT NULL,
    description VARCHAR ( 500 )
);

INSERT INTO succulents (name, species, genus, description)
VALUES
    ('Mother of Thousands', 'Kalanchoe daigremontiana', 'Kalanchoe', 'A succulent plant native to Madagascar. A fast-growing succulent with long, narrow leaves lined with tiny plantlets along the edges. These fall and root easily, allowing the plant to spread rapidly. It produces tall stems with tubular pink-orange flowers.'),

    ('Flapjack Plant', 'Kalanchoe luciae', 'Kalanchoe', 'A striking succulent with large, flat, paddle-shaped leaves that stack in a rosette. The leaves turn bright red along the edges in strong sun. It produces tall stems of yellow flowers in winter to spring. Native to southern Africa, mainly South Africa, Mozambique, and Zimbabwe.'),

    ('Kalanchoe panamensis', 'Kalanchoe panamensis', 'Kalanchoe', 'A tropical succulent with thick, glossy green leaves often edged with red. It forms upright, branching stems and produces clusters of small, star-shaped flowers. Native to Central America, it prefers warm temperatures and bright, indirect light.'),

    ('Desert Rose', 'Adenium obesum', 'Adenium', 'A poisonous flowering succulent, native to the Sahel regions south of the Sahara, tropical and subtropical eastern and southern Africa, and the Arabian Peninsula. Typically blookms twice a year, once in early spring and again in late summer or early fall.'),

    ('Bushman poison', 'Adenium boehmianum', 'Adenium', 'A caudiciform succulent shrub related to the desert rose. It has a thick, swollen trunk, narrow gray-green leaves, and produces striking pink to deep red trumpet-shaped flowers. Native to southern Africa, it is adapted to hot, dry conditions.'),

    ('Impala Lily', 'Adenium swazicum', 'Adenium', 'A compact desert rose species with a thick caudex and narrow, glossy leaves. It produces abundant pink, rose, or white trumpet-shaped flowers and blooms more freely than many Adeniums. Native to Eswatini and nearby regions, it prefers warm, sunny conditions.'),

    ('Aloe Vera', 'Aloe vera', 'Aloe', 'Considered an invasive species in many regions. Originates from the Arabian Peninsula, but also grows in tropical, semi-tropical, and arid climates around the world. Contains polysaccharide gel acemannan, which can be used for topical purposes.'),

    ('Golden Toothed Aloe', 'Aloe nobilis', 'Aloe', 'A small, clumping succulent with thick green leaves edged with yellow-orange teeth. It forms dense rosettes that spread by offsets and may turn reddish in strong sun. In winter to spring, it produces spikes of red to orange tubular flowers. It is native to southern Africa, especially parts of South Africa and neighboring regions.'),

    ('Spiral Aloe', 'Aloe polyphylla', 'Aloe', 'A rare mountain aloe known for its perfectly arranged spiral of thick, blue-green leaves. Native to Lesotho, it grows in cool, moist highlands and produces tall spikes of pink to red flowers in summer.');
`

async function main() {
    console.log('...seeding');
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        await client.query(SQL);
        console.log('done');
    } catch (err) {
        console.error('seeding failed:', err);
    } finally {
        await client.end();
    }
}

main();