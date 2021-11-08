const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const resolver = require('../app/resolver/lables.resolvers')
const userSchema = fs.readFileSync(
    path.join(__dirname, ".", "schema.gql"),
    "utf8"
);

describe("Query", () => {
    let tester;
    beforeAll(() => {
        tester = new EasyGraphQLTester(userSchema);
    });

    test("Mocking Label Query", () => {
        const query = `
    query
    {
        getLabel
        {
          labelName
          noteId
        }
    }
    `;
        const fixture = {
            data: {
                getLabel: [
                    {
                        labelName: "notes",
                        noteId: [
                            "61760ba4188de34129479323"
                        ]
                    }]
            }
        }
        tester.setFixture(fixture);
        const result = tester.mock({ query });
        expect(result.data.getLabel[0].labelName).toBe("notes");
        expect(result.data.getLabel[0].noteId[0]).toBe("61760ba4188de34129479323",
            "61760ba4188de34129479323");
    });
});
describe("Mutations", () => {
    let tester;
    beforeAll(() => {
        tester = new EasyGraphQLTester(userSchema);
    });


    describe("Mutations", () => {
        //createLabel Mutation Test Cases

        test("Given_createLabel_MutationShouldPass_IfTheFirstArgIsFalse_AndTheInputIsEmpty", () => {
            const mutation = `
        mutation createLabel($input: LabelInput) {
          createLabel(input: ) 
        }
      `;
            // First arg: false because the query is valid but the input value is empty
            // Second arg: query to test
            // Third argument is the input of the mutation
            tester.test(false, mutation, {});
        });
    })
    test("Given_createLabel_MutationShouldPass_IfTheFirstArg_IsFalse_And_TheInputHasInvalidField", () => {
        const mutation = `
        mutation createLabel($input: InvalidInput!) {
            createLabel(input: $input) 
          }
        `;
        // First arg: false because the mutation is valid but the input value has invalid field
        // Second arg: mutation to test
        // Third argument is the input of the mutation
        tester.test(false, mutation, [
            {
                String
            }
        ]);
    });
    test("Given_createLabel_MutationShouldPass_IfTheFirstArgIsTrue_And_TheInputIsValid", () => {
        const mutation = `
        mutation createLabel($input: LabelInput) {
            createLabel(input: $input) 
          }
        `;
        // First arg: true because the mutation is valid
        // Second arg: mutation to test
        // Third argument is the input of the mutation
        tester.test(true, mutation, {
            createLabel: "New Label Created Sucessfully"
        });
    });
})
