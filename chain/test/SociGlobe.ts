import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SociGlobe", () => {
  async function deployContract() {
    const SociGlobe = await ethers.getContractFactory("SociGlobe");
    const sociglobe = await SociGlobe.deploy();

    return { sociglobe };
  }

  describe("Deployment", () => {
    it("Should have empty posts", async () => {
      const { sociglobe } = await loadFixture(deployContract);

      expect(await sociglobe.getPosts()).to.be.empty;
    });
  });

  describe("Post Operations", () => {
    it("Should add post", async () => {
      const { sociglobe } = await loadFixture(deployContract);
  
      await sociglobe.createPost("Hello World!");

      const posts = await sociglobe.getPosts();
      expect(posts).to.have.lengthOf(1);
      expect(posts[0].content).to.deep.equal("Hello World!");
    });

    it("Should add multiple posts", async () => {
      const { sociglobe } = await loadFixture(deployContract);

      await sociglobe.createPost("Hello World!");
      await sociglobe.createPost("Hello World 2!");

      const posts = await sociglobe.getPosts();
      expect(posts).to.have.lengthOf(2);
      expect(posts[0].content).to.deep.equal("Hello World!");
      expect(posts[1].content).to.deep.equal("Hello World 2!");
    });

    it("Should give an upvote", async () => {
      const { sociglobe } = await loadFixture(deployContract);

      await sociglobe.createPost("Hello World!");
      await sociglobe.upvote(1);

      const posts = await sociglobe.getPosts();
      expect(posts).to.have.lengthOf(1);
      expect(posts[0].upvotes).to.deep.equal(1);
    })

    it("Should fail to give an upvote", async () => {
      const { sociglobe } = await loadFixture(deployContract);

      await sociglobe.createPost("Hello World!");
      await sociglobe.upvote(1);

      const posts = await sociglobe.getPosts();
      expect(posts).to.have.lengthOf(1);
      expect(posts[0].upvotes).to.deep.equal(1);

      await expect(sociglobe.upvote(1)).to.be.revertedWith("You already gave an upvote to this post");
      await expect(sociglobe.upvote(0)).to.be.revertedWith("Post doesn't exist");
    })
  });
})