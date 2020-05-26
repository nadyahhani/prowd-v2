const tempData = {
  items: [
    {
      topic:
        "Songs performed by Queen, Songs of the Hard Rock Music Genre, Songs",
      label: "Bohemian Rhapsody",
      id: "Q187745",
    },
    {
      topic: "Indonesian Dance, Dance, Balinese Dance",
      label: "Kecak",
      id: "Q1737691",
    },
    {
      topic: "Paintings by Leonardo Da Vinci, Paintings, Oil Paintings",
      label: "Mona Lisa",
      id: "Q12418",
    },
  ],
  examples: [
    "Actor and Actresses",
    "American Politicians",
    "Countries of the World",
    "Diseases",
  ],
  ex: [
    {
      label: "American Politicians",
      class: {
        id: "Q5",
        title: "Q5",
        pageid: 133,
        repository: "local",
        url: "//www.wikidata.org/wiki/Q5",
        concepturi: "http://www.wikidata.org/entity/Q5",
        label: "human",
        description:
          "common name of Homo sapiens, unique extant species of the genus Homo",
        match: { type: "label", language: "en", text: "human" },
      },
      filters: [
        {
          property: {
            id: "P27",
            title: "Property:P27",
            pageid: 3918429,
            repository: "local",
            url: "//www.wikidata.org/wiki/Property:P27",
            datatype: "wikibase-item",
            concepturi: "http://www.wikidata.org/entity/P27",
            label: "country of citizenship",
            description:
              "the object is a country that recognizes the subject as its citizen",
            match: {
              type: "label",
              language: "en",
              text: "country of citizenship",
            },
            category: "C",
          },
          value: {
            id: "Q30",
            title: "Q30",
            pageid: 126,
            repository: "local",
            url: "//www.wikidata.org/wiki/Q30",
            concepturi: "http://www.wikidata.org/entity/Q30",
            label: "United States of America",
            description: "sovereign state in North America",
            match: { type: "alias", language: "en", text: "USA" },
            aliases: ["USA"],
          },
        },
        {
          property: {
            id: "P106",
            title: "Property:P106",
            pageid: 4164914,
            repository: "local",
            url: "//www.wikidata.org/wiki/Property:P106",
            datatype: "wikibase-item",
            concepturi: "http://www.wikidata.org/entity/P106",
            label: "occupation",
            description:
              'occupation of a person; see also "field of work" (Property:P101), "position held" (Property:P39)',
            match: { type: "label", language: "en", text: "occupation" },
            category: "O",
          },
          value: {
            id: "Q82955",
            title: "Q82955",
            pageid: 85366,
            repository: "local",
            url: "//www.wikidata.org/wiki/Q82955",
            concepturi: "http://www.wikidata.org/entity/Q82955",
            label: "politician",
            description:
              "person involved in politics, person who holds or seeks positions in government",
            match: { type: "label", language: "en", text: "politician" },
          },
        },
      ],
    },
    {
      label: "Writers",
      class: {
        id: "Q5",
        title: "Q5",
        pageid: 133,
        repository: "local",
        url: "//www.wikidata.org/wiki/Q5",
        concepturi: "http://www.wikidata.org/entity/Q5",
        label: "human",
        description:
          "common name of Homo sapiens, unique extant species of the genus Homo",
        match: { type: "label", language: "en", text: "human" },
      },
      filters: [
        {
          property: {
            id: "P106",
            title: "Property:P106",
            pageid: 4164914,
            repository: "local",
            url: "//www.wikidata.org/wiki/Property:P106",
            datatype: "wikibase-item",
            concepturi: "http://www.wikidata.org/entity/P106",
            label: "occupation",
            description:
              'occupation of a person; see also "field of work" (Property:P101), "position held" (Property:P39)',
            match: { type: "label", language: "en", text: "occupation" },
            category: "O",
          },
          value: {
            id: "Q36180",
            title: "Q36180",
            pageid: 38833,
            repository: "local",
            url: "//www.wikidata.org/wiki/Q36180",
            concepturi: "http://www.wikidata.org/entity/Q36180",
            label: "writer",
            description:
              "person who uses written words to communicate ideas and to produce works of literature",
            match: { type: "label", language: "en", text: "writer" },
          },
        },
      ],
    },
    {
      label: "Countries in Europe",
      class: {
        id: "Q6256",
        title: "Q6256",
        pageid: 7367,
        repository: "local",
        url: "//www.wikidata.org/wiki/Q6256",
        concepturi: "http://www.wikidata.org/entity/Q6256",
        label: "country",
        description:
          "distinct region in geography; a broad term that can include political divisions or regions associated with distinct political characteristics",
        match: { type: "alias", language: "en", text: "countries" },
        aliases: ["countries"],
      },
      filters: [
        {
          property: {
            id: "P30",
            label: "continent",
          },
          value: {
            id: "Q46",
            label: "Europe",
          },
        },
      ],
    },
    {
      label: "Diseases with Fever",
      class: {
        id: "Q12136",
        title: "Q12136",
        pageid: 13706,
        repository: "local",
        url: "//www.wikidata.org/wiki/Q12136",
        concepturi: "http://www.wikidata.org/entity/Q12136",
        label: "disease",
        description: "abnormal condition negatively affecting organisms",
        match: { type: "label", language: "en", text: "disease" },
      },
      filters: [
        {
          property: {
            id: "P780",
            label: "symptoms",
          },
          value: {
            id: "Q38933",
            label: "fever",
          },
        },
      ],
    },
  ],
};

export default tempData;

const temp = {
  class: {
    id: "Q5",
    label: "human",
    description:
      "common name of Homo sapiens, unique extant species of the genus Homo",
    match: { type: "label", language: "en", text: "human" },
  },
  filters: [
    {
      property: {
        id: "P27",
        label: "country of citizenship",
        description:
          "the object is a country that recognizes the subject as its citizen",
        match: {
          type: "label",
          language: "en",
          text: "country of citizenship",
        },
      },
      value: {
        id: "Q30",
        label: "United States of America",
        description: "sovereign state in North America",
        match: { type: "alias", language: "en", text: "USA" },
        aliases: ["USA"],
      },
    },
    {
      property: {
        id: "P106",
        label: "occupation",
        description:
          'occupation of a person; see also "field of work" (Property:P101), "position held" (Property:P39)',
        match: { type: "label", language: "en", text: "occupation" },
      },
      value: {
        id: "Q82955",
        label: "politician",
        description:
          "person involved in politics, person who holds or seeks positions in government",
        match: { type: "label", language: "en", text: "politician" },
      },
    },
  ],
};
