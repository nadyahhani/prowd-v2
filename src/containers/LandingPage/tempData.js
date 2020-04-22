const tempData = {
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
          values: {
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
          values: {
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
      label: "Actors and Actresses",
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
          values: {
            id: "Q33999",
            title: "Q33999",
            pageid: 36800,
            repository: "local",
            url: "//www.wikidata.org/wiki/Q33999",
            concepturi: "http://www.wikidata.org/entity/Q33999",
            label: "actor",
            description:
              "person who acts in a dramatic or comic production and works in film, television, theatre, or radio",
            match: { type: "label", language: "en", text: "actor" },
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
          values: {
            id: "Q21169216",
            title: "Q21169216",
            pageid: 23216531,
            repository: "local",
            url: "//www.wikidata.org/wiki/Q21169216",
            concepturi: "http://www.wikidata.org/entity/Q21169216",
            label: "actress",
            description: "female actor",
            match: { type: "label", language: "en", text: "actress" },
          },
        },
      ],
    },
    {
      label: "Countries of the World",
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
      filters: [],
    },
    {
      label: "Diseases",
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
      filters: [],
    },
  ],
};

export default tempData;
