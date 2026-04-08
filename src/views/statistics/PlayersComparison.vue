<script setup>
import { ref, computed } from 'vue';
import { ArrowRight, Search } from '@element-plus/icons-vue';
import BasePlayerComparison from '@/components/BasePlayerComparison.vue';
import BasePlayerStatCard from '@/components/BasePlayerStatCard.vue';
import BasePlayerComparisonAddCard from '@/components/BasePlayerComparisonAddCard.vue';
import BasePlayerComparisonAddedCard from '@/components/BasePlayerComparisonAddedCard.vue';
import BaseComparisonOption from '@/components/BaseComparisonOption.vue';

const drawer = ref(false);
const addPlayerTitle = ref('Add a player 1');
const playerNumber = ref(1);
const searchPlayers = ref('');
const selectedPlayer1 = ref(null);
const selectedPlayer2 = ref(null);
const isPlayerSelected = ref(false);
const playerSelectedIndex = ref(0);

const isOverview = ref(false);
const isAttack = ref(false);
const isPossession = ref(false);
const isPhysical = ref(false);
const isDefence = ref(false);
const isDiscipline = ref(false);

const fullComparisonsFields = ref({
    overview: [],
    attack: [],
    possession: [],
    physical: [],
    defence: [],
    discipline: [],
});

function clickToAddPlayer(number, playerIndex)
{
    drawer.value = true;
    addPlayerTitle.value = `Add a player ${number}`;
    playerNumber.value = number;
    if (playerIndex != 0)
    {
        isPlayerSelected.value = true;
        playerSelectedIndex.value = playerIndex;
    } else
    {
        isPlayerSelected.value = false;
    }
}

function addPlayer(playerId)
{
    drawer.value = false;
    if (playerNumber.value === 1)
    {
        selectedPlayer1.value = players.value.find(player => player.id === playerId);
        isPlayerSelected.value = true;
        playerSelectedIndex.value = playerId;
    } else if (playerNumber.value === 2)
    {
        selectedPlayer2.value = players.value.find(player => player.id === playerId);
        isPlayerSelected.value = true;
        playerSelectedIndex.value = playerId;
    }

    if (selectedPlayer1.value && selectedPlayer2.value)
    {
        fullComparisonsFields.value = computeFullComparisonFields(selectedPlayer1.value.id, selectedPlayer2.value.id);
        console.log('comparison fields: ', fullComparisonsFields.value.length)
    }
}

function computeFullComparisonFields(playerOneId, playerTwoId)
{
    const playerOneStats = playersDetailedStatistics.value.find(player => player.playerId === playerOneId);
    const playerTwoStats = playersDetailedStatistics.value.find(player => player.playerId === playerTwoId);

    const comparisonFields = {
        overview: [],
        attack: [],
        possession: [],
        physical: [],
        defence: [],
        discipline: [],
    };

    for (const category in playerOneStats)
    {
        if (category !== 'playerId')
        {
            for (const stat in playerOneStats[category])
            {
                const playerOnePoint = playerOneStats[category][stat];
                const playerTwoPoint = playerTwoStats[category][stat];

                let playerOneMark = false;
                let playerTwoMark = false;

                if (playerOnePoint > playerTwoPoint)
                {
                    playerOneMark = true;
                } else if (playerTwoPoint > playerOnePoint)
                {
                    playerTwoMark = true;
                }
                else
                {
                    playerOneMark = true;
                    playerTwoMark = true;
                }

                comparisonFields[category].push({
                    label: stat.charAt(0).toUpperCase() + stat.slice(1).replace(/([A-Z])/g, ' $1'),
                    playerOnePoint: playerOnePoint,
                    playerTwoPoint: playerTwoPoint,
                    playerOneMark: playerOneMark,
                    playerTwoMark: playerTwoMark,
                });
            }
        }
    }

    return comparisonFields;
}

function cancelSelection()
{
    searchPlayers.value = '';
}

function viewFullComparison(playerOneId, playerTwoId)
{
    if (playerOneId && playerTwoId)
    {
        selectedPlayer1.value = players.value.find(player => player.id === playerOneId);
        selectedPlayer2.value = players.value.find(player => player.id === playerTwoId);
        isPlayerSelected.value = true;
        drawer.value = false;

        isOverview.value = false;
        isAttack.value = false;
        isPossession.value = false;
        isPhysical.value = false;
        isDefence.value = false;
        isDiscipline.value = false;

        fullComparisonsFields.value = computeFullComparisonFields(playerOneId, playerTwoId);

        // auto scroll up
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

const searchLower = computed(() => searchPlayers.value.toLowerCase());
const filteredPlayers = computed(() =>
{
    return players.value.filter(player =>
    {
        return (
            player.info.name.toLowerCase().includes(searchLower.value) ||
            player.club.name.toLowerCase().includes(searchLower.value) ||
            player.info.position.toLowerCase().includes(searchLower.value) ||
            player.info.nationality.toLowerCase().includes(searchLower.value)
        );
    });
});

const players = ref([
    {
        id: 1,
        rank: 1,
        info: {
            name: 'Gabriel Magalhães',
            photo: 'gabriel_magalhães.png',
            position: 'DEF',
            nationality: 'Brazil',
        },
        club: {
            clubCrest: 'ars.png',
            name: 'Arsenal',
            clubTheme: '#ff0000',
        },
        stat: 8
    },
    {
        id: 2,
        rank: 2,
        info: {
            name: 'Erling Haaland',
            photo: '223094.png',
            position: 'FWD',
            nationality: 'Norway',
        },
        club: {
            clubCrest: 'mci.png',
            name: 'Manchester City',
            clubTheme: '#7ab2e1',
        },
        stat: 7,
    },
    {
        id: 3,
        rank: 3,
        info: {
            name: 'Oleksandr Zinchenko',
            photo: 'oleksandr_zinchenko.png',
            position: 'DEF',
            nationality: 'Ukraine',
        },
        club: {
            clubCrest: 'ars.png',
            name: 'Arsenal',
            clubTheme: '#ff0000',
        },
        stat: 6
    },
    {
        id: 4,
        rank: 4,
        info: {
            name: 'Emiliano Buendía',
            photo: 'emiliano_buendía.png',
            position: 'MID',
            nationality: 'Argentina',
        },
        club: {
            clubCrest: 'avl.png',
            name: 'Aston Villa',
            clubTheme: '#480024',
        },
        stat: 5
    },
    {
        id: 5,
        rank: 1,
        info: {
            name: 'Chris Wood',
            photo: '60689.png',
            position: 'FWD',
            nationality: 'New Zealand',
        },
        club: {
            clubCrest: 'nf.svg',
            name: 'Nottingham Forest',
            clubTheme: '#eb0024',
        },
        stat: 8,
    },
    {
        id: 6,
        rank: 2,
        info: {
            name: 'James Trafford',
            photo: 'james_trafford.png',
            position: 'GK',
            nationality: 'England',
        },
        club: {
            clubCrest: 'bunley.svg',
            name: 'Burnley F.C.',
            clubTheme: '#81204c',
        },
        stat: 7
    },
    {
        id: 7,
        rank: 3,
        info: {
            name: 'Martin Ødegaard',
            photo: 'martin_qdegaard.png',
            position: 'MID',
            nationality: 'Norway',
        },
        club: {
            clubCrest: 'ars.png',
            name: 'Arsenal',
            clubTheme: '#ff0000',
        },
        stat: 6
    },
    {
        id: 8,
        rank: 4,
        info: {
            name: 'Eberechi Eze',
            photo: '232413.png',
            position: 'MID',
            nationality: 'England',
        },
        club: {
            clubCrest: 'cry.png',
            name: 'Crystal Palace',
            clubTheme: '#ee2e24',
        },
        stat: 5
    },
    {
        id: 9,
        rank: 3,
        info: {
            name: 'Virgil van Dijk',
            photo: '97032.png',
            position: 'DEF',
            nationality: 'Netherlands',
        },
        club: {
            clubCrest: 'liv.png',
            name: 'Liverpool',
            clubTheme: '#ffffff',
        },
        stat: 6
    },
    {
        id: 10,
        rank: 4,
        info: {
            name: 'Daniel Muñoz',
            photo: '247348.png',
            position: 'DEF',
            nationality: 'Colombia',
        },
        club: {
            clubCrest: 'cry.png',
            name: 'Crystal Palace',
            clubTheme: '#ee2e24',
        },
        stat: 5
    },
    {
        id: 11,
        rank: 4,
        info: {
            name: 'Nikola Milenkovic',
            photo: '227444.png',
            position: 'DEF',
            nationality: 'Serbia',
        },
        club: {
            clubCrest: 'nf.svg',
            name: 'Nottingham Forest',
            clubTheme: '#eb0024',
        },
        stat: 5
    },
    {
        id: 12,
        rank: 4,
        info: {
            name: 'Ola Aina',
            photo: '159506.png',
            position: 'DEF',
            nationality: 'Nigeria',
        },
        club: {
            clubCrest: 'nf.svg',
            name: 'Nottingham Forest',
            clubTheme: '#eb0024',
        },
        stat: 5
    },
    {
        id: 13,
        rank: 4,
        info: {
            name: 'Brenden Aaronson',
            photo: 'brenden_aaronson.png',
            position: 'MID',
            nationality: 'United States',
        },
        club: {
            clubCrest: 'leed.svg',
            name: 'Leeds United',
            clubTheme: '#ffd600',
        },
        stat: 5
    },
    {
        id: 14,
        rank: 4,
        info: {
            name: 'Matty Cash',
            photo: 'matty_cash.png',
            position: 'DEF',
            nationality: 'Poland',
        },
        club: {
            clubCrest: 'avl.png',
            name: 'Aston Villa',
            clubTheme: '#480024',
        },
        stat: 5
    },
    {
        id: 15,
        rank: 4,
        info: {
            name: 'Gabriel Gudmundsson',
            photo: 'gabriel_gudmundsson.png',
            position: 'DEF',
            nationality: 'Sweden',
        },
        club: {
            clubCrest: 'leed.svg',
            name: 'Leeds United',
            clubTheme: '#ffd600',
        },
        stat: 5
    },
]);

const playersDetailedStatistics = ref([
    {
        playerId: 1,
        overview: {
            appearances: 7,
            minutesPlayed: 630,
            goals: 2,
            assists: 0,
            yellowCards: 2,
            redCards: 0,
        },
        attack: {
            goalInvolvements: 2,
            expectedGoals: 1.45,
            shotsInsideTheBox: 8,
            shotsOutsideTheBox: 1,
            touchesInTheOppositionBox: 18,
            penaltiesScored: 0,
            hitWoodwork: 0,
            expectedAssists: 0.35,
            freeKicksScored: 0,
            crossesPercentage: '0(0%)',
        },
        possession: {
            passes: 245,
            longPassesCompletedPercentage: '45(82%)',
            throughBalls: 3,
        },
        physical: {
            minutesPlayed: 630,
            dribbles: 8,
            duelsWon: 42,
            aerialDuelsWon: 28,
        },
        defence: {
            tackles: 15,
            blocks: 12,
            interceptions: 18,
            clearances: 35,
        },
        discipline: {
            fouls: 8,
            offsides: 1,
        },
    },
    {
        playerId: 2,
        overview: {
            appearances: 6,
            minutesPlayed: 596,
            goals: 8,
            assists: 1,
            yellowCards: 0,
            redCards: 0,
        },
        attack: {
            goalInvolvements: 10,
            expectedGoals: 7.71,
            shotsInsideTheBox: 6,
            shotsOutsideTheBox: 0,
            touchesInTheOppositionBox: 45,
            penaltiesScored: 0,
            hitWoodwork: 1,
            expectedAssists: 0.73,
            freeKicksScored: 0,
            crossesPercentage: '0(0%)',
        },
        possession: {
            passes: 83,
            longPassesCompletedPercentage: '1(100%)',
            throughBalls: 2,
        },
        physical: {
            minutesPlayed: 596,
            dribbles: 5,
            duelsWon: 23,
            aerialDuelsWon: 16,
        },
        defence: {
            tackles: 1,
            blocks: 0,
        },
        discipline: {
            fouls: 7,
            offsides: 0,
        },
    },
    {
        playerId: 3,
        overview: {
            appearances: 8,
            minutesPlayed: 685,
            goals: 0,
            assists: 3,
            yellowCards: 1,
            redCards: 0,
        },
        attack: {
            goalInvolvements: 3,
            expectedGoals: 0.45,
            shotsInsideTheBox: 5,
            shotsOutsideTheBox: 3,
            touchesInTheOppositionBox: 22,
            penaltiesScored: 0,
            hitWoodwork: 0,
            expectedAssists: 1.85,
            freeKicksScored: 0,
            crossesPercentage: '12(42%)',
        },
        possession: {
            passes: 412,
            longPassesCompletedPercentage: '38(76%)',
            throughBalls: 8,
        },
        physical: {
            minutesPlayed: 685,
            dribbles: 15,
            duelsWon: 38,
            aerialDuelsWon: 12,
        },
        defence: {
            tackles: 18,
            blocks: 8,
            interceptions: 14,
            clearances: 22,
        },
        discipline: {
            fouls: 6,
            offsides: 0,
        },
    },
    {
        playerId: 4,
        overview: {
            appearances: 7,
            minutesPlayed: 512,
            goals: 1,
            assists: 2,
            yellowCards: 2,
            redCards: 0,
        },
        attack: {
            goalInvolvements: 3,
            expectedGoals: 1.25,
            shotsInsideTheBox: 7,
            shotsOutsideTheBox: 5,
            touchesInTheOppositionBox: 28,
            penaltiesScored: 0,
            hitWoodwork: 0,
            expectedAssists: 1.45,
            freeKicksScored: 0,
            crossesPercentage: '18(39%)',
        },
        possession: {
            passes: 198,
            longPassesCompletedPercentage: '22(68%)',
            throughBalls: 6,
        },
        physical: {
            minutesPlayed: 512,
            dribbles: 22,
            duelsWon: 31,
            aerialDuelsWon: 8,
        },
        defence: {
            tackles: 12,
            blocks: 3,
            interceptions: 9,
            clearances: 5,
        },
        discipline: {
            fouls: 9,
            offsides: 2,
        },
    },
    {
        playerId: 5,
        overview: {
            appearances: 6,
            minutesPlayed: 528,
            goals: 2,
            assists: 0,
            yellowCards: 0,
            redCards: 0,
        },
        attack: {
            goalInvolvements: 2,
            expectedGoals: 2.77,
            shotsInsideTheBox: 4,
            shotsOutsideTheBox: 0,
            touchesInTheOppositionBox: 22,
            penaltiesScored: 0,
            hitWoodwork: 1,
            expectedAssists: 0.12,
            freeKicksScored: 0,
            crossesPercentage: '1(0%)',
        },
        possession: {
            passes: 79,
            longPassesCompletedPercentage: '1(100%)',
            throughBalls: 0,
        },
        physical: {
            minutesPlayed: 528,
            dribbles: 1,
            duelsWon: 16,
            aerialDuelsWon: 11,
        },
        defence: {
            tackles: 0,
            blocks: 1,
        },
        discipline: {
            fouls: 5,
            offsides: 3,
        },
    },
    {
        playerId: 6,
        overview: {
            appearances: 8,
            minutesPlayed: 720,
            goals: 0,
            assists: 0,
            yellowCards: 1,
            redCards: 0,
        },
        attack: {
            goalInvolvements: 0,
            expectedGoals: 0,
            shotsInsideTheBox: 0,
            shotsOutsideTheBox: 0,
            touchesInTheOppositionBox: 0,
            penaltiesScored: 0,
            hitWoodwork: 0,
            expectedAssists: 0.05,
            freeKicksScored: 0,
            crossesPercentage: '0(0%)',
        },
        possession: {
            passes: 185,
            longPassesCompletedPercentage: '65(72%)',
            throughBalls: 0,
        },
        physical: {
            minutesPlayed: 720,
            dribbles: 2,
            duelsWon: 8,
            aerialDuelsWon: 3,
        },
        defence: {
            tackles: 1,
            blocks: 0,
            saves: 28,
            cleanSheets: 2,
            goalsConceded: 12,
        },
        discipline: {
            fouls: 2,
            offsides: 0,
        },
    },
    {
        playerId: 7,
        overview: {
            appearances: 7,
            minutesPlayed: 598,
            goals: 3,
            assists: 2,
            yellowCards: 1,
            redCards: 0,
        },
        attack: {
            goalInvolvements: 5,
            expectedGoals: 2.15,
            shotsInsideTheBox: 9,
            shotsOutsideTheBox: 7,
            touchesInTheOppositionBox: 35,
            penaltiesScored: 0,
            hitWoodwork: 1,
            expectedAssists: 2.35,
            freeKicksScored: 0,
            crossesPercentage: '15(47%)',
        },
        possession: {
            passes: 345,
            longPassesCompletedPercentage: '28(75%)',
            throughBalls: 12,
        },
        physical: {
            minutesPlayed: 598,
            dribbles: 18,
            duelsWon: 42,
            aerialDuelsWon: 6,
        },
        defence: {
            tackles: 14,
            blocks: 5,
            interceptions: 11,
            clearances: 8,
        },
        discipline: {
            fouls: 7,
            offsides: 1,
        },
    },
    {
        playerId: 8,
        overview: {
            appearances: 6,
            minutesPlayed: 485,
            goals: 2,
            assists: 1,
            yellowCards: 0,
            redCards: 0,
        },
        attack: {
            goalInvolvements: 3,
            expectedGoals: 1.65,
            shotsInsideTheBox: 6,
            shotsOutsideTheBox: 4,
            touchesInTheOppositionBox: 25,
            penaltiesScored: 0,
            hitWoodwork: 0,
            expectedAssists: 1.25,
            freeKicksScored: 1,
            crossesPercentage: '8(38%)',
        },
        possession: {
            passes: 167,
            longPassesCompletedPercentage: '15(67%)',
            throughBalls: 5,
        },
        physical: {
            minutesPlayed: 485,
            dribbles: 24,
            duelsWon: 35,
            aerialDuelsWon: 7,
        },
        defence: {
            tackles: 9,
            blocks: 2,
            interceptions: 7,
            clearances: 4,
        },
        discipline: {
            fouls: 5,
            offsides: 3,
        },
    },
    {
        playerId: 9,
        overview: {
            appearances: 7,
            minutesPlayed: 630,
            goals: 1,
            assists: 0,
            yellowCards: 1,
            redCards: 0,
        },
        attack: {
            goalInvolvements: 1,
            expectedGoals: 1.05,
            shotsInsideTheBox: 5,
            shotsOutsideTheBox: 1,
            touchesInTheOppositionBox: 12,
            penaltiesScored: 0,
            hitWoodwork: 0,
            expectedAssists: 0.45,
            freeKicksScored: 0,
            crossesPercentage: '0(0%)',
        },
        possession: {
            passes: 385,
            longPassesCompletedPercentage: '52(81%)',
            throughBalls: 2,
        },
        physical: {
            minutesPlayed: 630,
            dribbles: 3,
            duelsWon: 48,
            aerialDuelsWon: 35,
        },
        defence: {
            tackles: 16,
            blocks: 14,
            interceptions: 22,
            clearances: 42,
        },
        discipline: {
            fouls: 6,
            offsides: 1,
        },
    },
    {
        playerId: 10,
        overview: {
            appearances: 6,
            minutesPlayed: 540,
            goals: 0,
            assists: 2,
            yellowCards: 2,
            redCards: 0,
        },
        attack: {
            goalInvolvements: 2,
            expectedGoals: 0.35,
            shotsInsideTheBox: 3,
            shotsOutsideTheBox: 2,
            touchesInTheOppositionBox: 15,
            penaltiesScored: 0,
            hitWoodwork: 0,
            expectedAssists: 1.15,
            freeKicksScored: 0,
            crossesPercentage: '22(41%)',
        },
        possession: {
            passes: 198,
            longPassesCompletedPercentage: '25(72%)',
            throughBalls: 3,
        },
        physical: {
            minutesPlayed: 540,
            dribbles: 12,
            duelsWon: 32,
            aerialDuelsWon: 14,
        },
        defence: {
            tackles: 18,
            blocks: 7,
            interceptions: 15,
            clearances: 28,
        },
        discipline: {
            fouls: 8,
            offsides: 2,
        },
    },
    {
        playerId: 11,
        overview: {
            appearances: 7,
            minutesPlayed: 630,
            goals: 0,
            assists: 0,
            yellowCards: 3,
            redCards: 0,
        },
        attack: {
            goalInvolvements: 0,
            expectedGoals: 0.85,
            shotsInsideTheBox: 4,
            shotsOutsideTheBox: 1,
            touchesInTheOppositionBox: 8,
            penaltiesScored: 0,
            hitWoodwork: 0,
            expectedAssists: 0.25,
            freeKicksScored: 0,
            crossesPercentage: '0(0%)',
        },
        possession: {
            passes: 275,
            longPassesCompletedPercentage: '42(76%)',
            throughBalls: 1,
        },
        physical: {
            minutesPlayed: 630,
            dribbles: 4,
            duelsWon: 45,
            aerialDuelsWon: 32,
        },
        defence: {
            tackles: 19,
            blocks: 16,
            interceptions: 24,
            clearances: 38,
        },
        discipline: {
            fouls: 11,
            offsides: 1,
        },
    },
    {
        playerId: 12,
        overview: {
            appearances: 6,
            minutesPlayed: 540,
            goals: 0,
            assists: 1,
            yellowCards: 1,
            redCards: 0,
        },
        attack: {
            goalInvolvements: 1,
            expectedGoals: 0.45,
            shotsInsideTheBox: 2,
            shotsOutsideTheBox: 1,
            touchesInTheOppositionBox: 12,
            penaltiesScored: 0,
            hitWoodwork: 0,
            expectedAssists: 0.85,
            freeKicksScored: 0,
            crossesPercentage: '14(36%)',
        },
        possession: {
            passes: 185,
            longPassesCompletedPercentage: '28(71%)',
            throughBalls: 2,
        },
        physical: {
            minutesPlayed: 540,
            dribbles: 14,
            duelsWon: 34,
            aerialDuelsWon: 16,
        },
        defence: {
            tackles: 16,
            blocks: 9,
            interceptions: 18,
            clearances: 25,
        },
        discipline: {
            fouls: 7,
            offsides: 3,
        },
    },
    {
        playerId: 13,
        overview: {
            appearances: 7,
            minutesPlayed: 512,
            goals: 1,
            assists: 2,
            yellowCards: 1,
            redCards: 0,
        },
        attack: {
            goalInvolvements: 3,
            expectedGoals: 1.25,
            shotsInsideTheBox: 6,
            shotsOutsideTheBox: 5,
            touchesInTheOppositionBox: 28,
            penaltiesScored: 0,
            hitWoodwork: 0,
            expectedAssists: 1.65,
            freeKicksScored: 0,
            crossesPercentage: '16(44%)',
        },
        possession: {
            passes: 215,
            longPassesCompletedPercentage: '18(67%)',
            throughBalls: 7,
        },
        physical: {
            minutesPlayed: 512,
            dribbles: 19,
            duelsWon: 33,
            aerialDuelsWon: 9,
        },
        defence: {
            tackles: 13,
            blocks: 4,
            interceptions: 11,
            clearances: 7,
        },
        discipline: {
            fouls: 8,
            offsides: 4,
        },
    },
    {
        playerId: 14,
        overview: {
            appearances: 7,
            minutesPlayed: 630,
            goals: 1,
            assists: 1,
            yellowCards: 2,
            redCards: 0,
        },
        attack: {
            goalInvolvements: 2,
            expectedGoals: 0.95,
            shotsInsideTheBox: 5,
            shotsOutsideTheBox: 3,
            touchesInTheOppositionBox: 18,
            penaltiesScored: 0,
            hitWoodwork: 0,
            expectedAssists: 1.05,
            freeKicksScored: 0,
            crossesPercentage: '19(42%)',
        },
        possession: {
            passes: 245,
            longPassesCompletedPercentage: '35(74%)',
            throughBalls: 4,
        },
        physical: {
            minutesPlayed: 630,
            dribbles: 16,
            duelsWon: 41,
            aerialDuelsWon: 19,
        },
        defence: {
            tackles: 21,
            blocks: 11,
            interceptions: 19,
            clearances: 32,
        },
        discipline: {
            fouls: 9,
            offsides: 2,
        },
    },
    {
        playerId: 15,
        overview: {
            appearances: 6,
            minutesPlayed: 540,
            goals: 0,
            assists: 2,
            yellowCards: 1,
            redCards: 0,
        },
        attack: {
            goalInvolvements: 2,
            expectedGoals: 0.35,
            shotsInsideTheBox: 2,
            shotsOutsideTheBox: 1,
            touchesInTheOppositionBox: 11,
            penaltiesScored: 0,
            hitWoodwork: 0,
            expectedAssists: 1.25,
            freeKicksScored: 0,
            crossesPercentage: '17(41%)',
        },
        possession: {
            passes: 195,
            longPassesCompletedPercentage: '22(69%)',
            throughBalls: 3,
        },
        physical: {
            minutesPlayed: 540,
            dribbles: 13,
            duelsWon: 36,
            aerialDuelsWon: 15,
        },
        defence: {
            tackles: 17,
            blocks: 8,
            interceptions: 16,
            clearances: 27,
        },
        discipline: {
            fouls: 6,
            offsides: 1,
        },
    }
]);

const fwdComparison = ref({
    playerOne: {
        id: 2,
        info: {
            name: 'Haaland',
            photo: '223094.png',
            shortPosition: 'FWD',
        },
        club: {
            name: 'Manchester City',
            clubCrest: 'mci.png',
            clubTheme: '#7ab2e1',
        },
        sessions: '2025/26',
    },
    playerTwo: {
        id: 5,
        info: {
            name: 'Wood',
            photo: '60689.png',
            shortPosition: 'FWD',
        },
        club: {
            name: 'Nottingham Forest',
            clubCrest: 'nf.svg',
            clubTheme: '#eb0024',
        },
        sessions: '2025/26',
    },
    comparisonsFields: [
        {
            label: 'Expected Goals',
            playerOnePoint: '7.43',
            playerTwoPoint: '2.73',
            playerOneMark: true,
            playerTwoMark: false,
        },
        {
            label: 'Assists',
            playerOnePoint: '1',
            playerTwoPoint: 'N/A',
            playerOneMark: false,
            playerTwoMark: true,
        },
        {
            label: 'Goals',
            playerOnePoint: '8',
            playerTwoPoint: '2',
            playerOneMark: true,
            playerTwoMark: false,
        },
        {
            label: 'Appearances',
            playerOnePoint: '6',
            playerTwoPoint: '6',
            playerOneMark: true,
            playerTwoMark: true,
        },
        {
            label: 'GoalInvolvements',
            playerOnePoint: '1.33',
            playerTwoPoint: '0.33',
            playerOneMark: true,
            playerTwoMark: false,
        },
    ],
    fullComparisons: {
        overview: [
            {
                label: 'Appearances',
                playerOnePoint: '7',
                playerTwoPoint: '7',
                playerOneMark: true,
                playerTwoMark: true,
            },
            {
                label: 'Minutes played',
                playerOnePoint: '596',
                playerTwoPoint: '528',
                playerOneMark: true,
                playerTwoMark: false,
            },
            {
                label: 'Goals',
                playerOnePoint: '9',
                playerTwoPoint: '2',
                playerOneMark: true,
                playerTwoMark: false,
            },
            {
                label: 'Assists',
                playerOnePoint: '1',
                playerTwoPoint: '0',
                playerOneMark: true,
                playerTwoMark: false,
            },
            {
                label: 'Yellow Cards',
                playerOnePoint: '0',
                playerTwoPoint: '0',
                playerOneMark: true,
                playerTwoMark: true,
            },
            {
                label: 'Red Cards',
                playerOnePoint: '0',
                playerTwoPoint: '0',
                playerOneMark: true,
                playerTwoMark: true,
            },
        ],
        attack: [
            {
                label: 'Goal Involvements',
                playerOnePoint: '10',
                playerTwoPoint: '2',
                playerOneMark: true,
                playerTwoMark: false,
            },
            {
                label: 'Expected goals',
                playerOnePoint: '7.71',
                playerTwoPoint: '2.77',
                playerOneMark: true,
                playerTwoMark: false,
            },
            {
                label: 'Shots Inside the Box',
                playerOnePoint: '6',
                playerTwoPoint: '4',
                playerOneMark: true,
                playerTwoMark: false,
            },
            {
                label: 'Shots Outside the Box',
                playerOnePoint: '0',
                playerTwoPoint: '0',
                playerOneMark: true,
                playerTwoMark: true,
            },
            {
                label: 'Touches in the opposition box',
                playerOnePoint: '45',
                playerTwoPoint: '22',
                playerOneMark: true,
                playerTwoMark: false,
            },
            {
                label: 'Penalties(Scored)',
                playerOnePoint: '0',
                playerTwoPoint: '0',
                playerOneMark: true,
                playerTwoMark: true,
            },
            {
                label: 'Hit Woodwork',
                playerOnePoint: '1',
                playerTwoPoint: '1',
                playerOneMark: true,
                playerTwoMark: true,
            },
            {
                label: 'Expected Assists',
                playerOnePoint: '0.73',
                playerTwoPoint: '0.12',
                playerOneMark: true,
                playerTwoMark: false,
            },
            {
                label: 'Free Kicks(Scored)',
                playerOnePoint: '0',
                playerTwoPoint: '0',
                playerOneMark: true,
                playerTwoMark: true,
            },
            {
                label: 'Crosses(%)',
                playerOnePoint: '0(0%)',
                playerTwoPoint: '1(0%)',
                playerOneMark: false,
                playerTwoMark: true,
            },
        ],
        possession: [
            {
                label: 'Passes',
                playerOnePoint: '83',
                playerTwoPoint: '79',
                playerOneMark: true,
                playerTwoMark: false,
            },
            {
                label: 'Long Passes(% Completed)',
                playerOnePoint: '1',
                playerTwoPoint: '1',
                playerOneMark: true,
                playerTwoMark: true,
            },
            {
                label: 'Through Balls',
                playerOnePoint: '2',
                playerTwoPoint: '0',
                playerOneMark: true,
                playerTwoMark: false,
            },
        ],
        physical: [
            {
                label: 'Minutes played',
                playerOnePoint: '596',
                playerTwoPoint: '528',
                playerOneMark: true,
                playerTwoMark: false,
            },
            {
                label: 'Dribbles',
                playerOnePoint: '5',
                playerTwoPoint: '1',
                playerOneMark: true,
                playerTwoMark: false,
            },
            {
                label: 'Duels Won',
                playerOnePoint: '23',
                playerTwoPoint: '16',
                playerOneMark: true,
                playerTwoMark: false,
            },
            {
                label: 'Aerial Duels Won',
                playerOnePoint: '16',
                playerTwoPoint: '11',
                playerOneMark: true,
                playerTwoMark: false,
            },
        ],
        defence: [
            {
                label: 'Tackles',
                playerOnePoint: '1',
                playerTwoPoint: '0',
                playerOneMark: true,
                playerTwoMark: false,
            },
            {
                label: 'Blocks',
                playerOnePoint: '0',
                playerTwoPoint: '1',
                playerOneMark: false,
                playerTwoMark: true,
            },
        ],
        discipline: [
            {
                label: 'Fouls',
                playerOnePoint: '7',
                playerTwoPoint: '5',
                playerOneMark: true,
                playerTwoMark: false,
            },
            {
                label: 'Offsides',
                playerOnePoint: '0',
                playerTwoPoint: '3',
                playerOneMark: true,
                playerTwoMark: false,
            },
        ],
    }
});

const midComparison = ref({
    playerOne: {
        id: 7,
        info: {
            name: 'Ødegaard',
            photo: 'martin_qdegaard.png',
            shortPosition: 'MID',
        },
        club: {
            name: 'Arsenal',
            clubCrest: 'ars.png',
            clubTheme: '#ff0000',
        },
        sessions: '2025/26',
    },
    playerTwo: {
        id: 8,
        info: {
            name: 'Eze',
            photo: '232413.png',
            shortPosition: 'MID',
        },
        club: {
            name: 'Arsenal',
            clubCrest: 'ars.png',
            clubTheme: '#ff0000',
        },
        sessions: '2025/26',
    },
    comparisonsFields: [
        {
            label: 'Expected Goals',
            playerOnePoint: '0.14',
            playerTwoPoint: '0.24',
            playerOneMark: false,
            playerTwoMark: true,
        },
        {
            label: 'Total Passes',
            playerOnePoint: '93',
            playerTwoPoint: '77',
            playerOneMark: true,
            playerTwoMark: false,
        },
        {
            label: 'Total Tackles',
            playerOnePoint: '2',
            playerTwoPoint: '2',
            playerOneMark: true,
            playerTwoMark: true,
        },
        {
            label: 'Goals',
            playerOnePoint: 'N/A',
            playerTwoPoint: 'N/A',
            playerOneMark: true,
            playerTwoMark: true,
        },
        {
            label: 'Assists',
            playerOnePoint: 'N/A',
            playerTwoPoint: '2',
            playerOneMark: false,
            playerTwoMark: true,
        },
        {
            label: 'GoalInvolvements',
            playerOnePoint: 'N/A',
            playerTwoPoint: 'N/A',
            playerOneMark: true,
            playerTwoMark: true,
        },
    ],
});

const defComparison1 = ref({
    playerOne: {
        id: 11,
        info: {
            name: 'Milenkovic',
            photo: '227444.png',
            shortPosition: 'DEF',
        },
        club: {
            name: 'Nottingham Forest',
            clubCrest: 'nf.svg',
            clubTheme: '#eb0024',
        },
        sessions: '2025/26',
    },
    playerTwo: {
        id: 9,
        info: {
            name: 'van Dijk',
            photo: '97032.png',
            shortPosition: 'DEF',
        },
        club: {
            name: 'Liverpool',
            clubCrest: 'liv.png',
            clubTheme: '#ffffff',
        },
        sessions: '2025/26',
    },
    comparisonsFields: [
        {
            label: 'Clean Sheets',
            playerOnePoint: 'N/A',
            playerTwoPoint: '2',
            playerOneMark: false,
            playerTwoMark: true,
        },
        {
            label: 'Goals Conceded',
            playerOnePoint: '10',
            playerTwoPoint: '7',
            playerOneMark: true,
            playerTwoMark: false,
        },
        {
            label: 'Total Tackles',
            playerOnePoint: '2',
            playerTwoPoint: '3',
            playerOneMark: false,
            playerTwoMark: true,
        },
        {
            label: 'Clearances',
            playerOnePoint: '28',
            playerTwoPoint: '55',
            playerOneMark: false,
            playerTwoMark: true,
        }
    ],
});

const defComparison2 = ref({
    playerOne: {
        id: 12,
        info: {
            name: 'Aina',
            photo: '159506.png',
            shortPosition: 'DEF',
        },
        club: {
            name: 'Nottingham Forest',
            clubCrest: 'nf.svg',
            clubTheme: '#eb0024',
        },
        sessions: '2025/26',
    },
    playerTwo: {
        id: 10,
        info: {
            name: 'Muñoz',
            photo: '247348.png',
            shortPosition: 'DEF',
        },
        club: {
            name: 'Crystal Palace',
            clubCrest: 'cry.png',
            clubTheme: '#ee2e24',
        },
        sessions: '2025/26',
    },
    comparisonsFields: [
        {
            label: 'Clean Sheets',
            playerOnePoint: 'N/A',
            playerTwoPoint: '3',
            playerOneMark: false,
            playerTwoMark: true,
        },
        {
            label: 'Goals Conceded',
            playerOnePoint: '5',
            playerTwoPoint: '3',
            playerOneMark: true,
            playerTwoMark: false,
        },
        {
            label: 'Total Tackles',
            playerOnePoint: '6',
            playerTwoPoint: '12',
            playerOneMark: false,
            playerTwoMark: true,
        },
        {
            label: 'Clearances',
            playerOnePoint: '11',
            playerTwoPoint: '20',
            playerOneMark: false,
            playerTwoMark: true,
        }
    ],
});

</script>

<template>
    <div class="mx-4 my-4">
        <h2 class="text-white md:text-2xl text-xl font-bold mb-4">Player Comparison</h2>

        <div class="flex flex-col gap-4 lg:w-1/2">
            <div class="flex flex-col gap-6" :style="{
                backgroundColor: selectedPlayer1 && selectedPlayer2 ? '#28002b' : 'transparent',
                padding: selectedPlayer1 && selectedPlayer2 ? '16px' : '0',
                borderRadius: selectedPlayer1 && selectedPlayer2 ? '16px' : '0',
            }">
                <div class="flex flex-2 gap-4 h-fit">
                    <BasePlayerComparisonAddedCard v-if="selectedPlayer1" :player="selectedPlayer1"
                        @click-to-add-player="clickToAddPlayer" :param="1" :player-index="selectedPlayer1.id" />
                    <BasePlayerComparisonAddCard v-else @click-to-add-player="clickToAddPlayer" :param="1" />

                    <BasePlayerComparisonAddedCard v-if="selectedPlayer2" :player="selectedPlayer2"
                        @click-to-add-player="clickToAddPlayer" :param="2" :player-index="selectedPlayer2.id" />
                    <BasePlayerComparisonAddCard v-else @click-to-add-player="clickToAddPlayer" :param="2" />
                </div>

                <BaseComparisonOption :title="'Overview'" :is-options-visible="isOverview"
                    :comparisons-fields="fullComparisonsFields.overview" :selected-player1="selectedPlayer1"
                    :selected-player2="selectedPlayer2" @toggle-options-visibility="isOverview = !isOverview" />

                <BaseComparisonOption :title="'Attack'" :is-options-visible="isAttack"
                    :comparisons-fields="fullComparisonsFields.attack" :selected-player1="selectedPlayer1"
                    :selected-player2="selectedPlayer2" @toggle-options-visibility="isAttack = !isAttack" />

                <BaseComparisonOption :title="'Possession'" :is-options-visible="isPossession"
                    :comparisons-fields="fullComparisonsFields.possession" :selected-player1="selectedPlayer1"
                    :selected-player2="selectedPlayer2" @toggle-options-visibility="isPossession = !isPossession" />

                <BaseComparisonOption :title="'Physical'" :is-options-visible="isPhysical"
                    :comparisons-fields="fullComparisonsFields.physical" :selected-player1="selectedPlayer1"
                    :selected-player2="selectedPlayer2" @toggle-options-visibility="isPhysical = !isPhysical" />

                <BaseComparisonOption :title="'Defence'" :is-options-visible="isDefence"
                    :comparisons-fields="fullComparisonsFields.defence" :selected-player1="selectedPlayer1"
                    :selected-player2="selectedPlayer2" @toggle-options-visibility="isDefence = !isDefence" />

                <BaseComparisonOption :title="'Discipline'" :is-options-visible="isDiscipline"
                    :comparisons-fields="fullComparisonsFields.discipline" :is-full-comparison="true"
                    :selected-player1="selectedPlayer1" :selected-player2="selectedPlayer2"
                    @toggle-options-visibility="isDiscipline = !isDiscipline" />

            </div>

            <div class="flex-2">
                <div class="flex bg-[#28002b] rounded-lg px-3 py-2 flex-2">
                    <a href="#"
                        class="hover:cursor-pointer hover:underline text-wrap text-center flex items-center justify-between w-full">
                        <span class="text-white text-sm">Some statistics are not available prior to the 2006/07 season.
                            Click here to more
                            details.</span>
                        <el-icon>
                            <ArrowRight class="text-lg text-white" />
                        </el-icon>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="mx-4 my-4">
        <h2 class="text-white md:text-2xl text-xl font-bold mb-4">Popular player comparisons</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            <BasePlayerComparison :comparisons="fwdComparison"
                @view-full-comparison="viewFullComparison(fwdComparison.playerOne.id, fwdComparison.playerTwo.id)" />
            <BasePlayerComparison :comparisons="midComparison"
                @view-full-comparison="viewFullComparison(midComparison.playerOne.id, midComparison.playerTwo.id)" />
            <BasePlayerComparison :comparisons="defComparison1"
                @view-full-comparison="viewFullComparison(defComparison1.playerOne.id, defComparison1.playerTwo.id)" />
            <BasePlayerComparison :comparisons="defComparison2"
                @view-full-comparison="viewFullComparison(defComparison2.playerOne.id, defComparison2.playerTwo.id)" />
        </div>
    </div>

    <el-drawer v-model="drawer" class="!bg-[#28002b]" :size="'23%'">
        <template #header>
            <div class="flex flex-col gap-5">
                <h4 class="text-white font-bold text-3xl">{{ addPlayerTitle }}</h4>
            </div>
        </template>
        <template #default>
            <div class="flex flex-col gap-3">
                <div class="flex">
                    <el-input v-model="searchPlayers" placeholder="Search" class="search-input w-full !text-[15px]"
                        :size="'large'" :prefix-icon="Search" />
                    <el-button class="ml-1 !bg-transparent !border-0 !text-[15px] !font-bold !text-white"
                        @click="cancelSelection">
                        Cancel
                    </el-button>
                </div>
                <span class="text-white font-bold text-sm">Clubs</span>
                <div class="overflow-y-auto overflow-x-hidden">
                    <div v-for="player in filteredPlayers" class="grid grid-cols-[1fr_72px] ">
                        <BasePlayerStatCard :player="player" :is-rank-visible="false" :is-stat-visible="false" />
                        <button
                            disabled="isPlayerSelected && players.findIndex(p => p.id === player.id) === playerSelectedIndex-1"
                            v-if="isPlayerSelected && players.findIndex(p => p.id === player.id) === playerSelectedIndex - 1"
                            class="text-gray-500 text-sm bg-transparent border-1 border-[#55005a] rounded-full w-18 h-8">
                            Add
                        </button>
                        <button v-else
                            class="text-[#3e003f] text-sm bg-white hover:bg-[#55005a] hover:text-white rounded-full w-18 h-8"
                            @click="addPlayer(player.id)">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </el-drawer>
</template>

<style scoped>
.search-input ::v-deep(.el-input__wrapper) {
    background-color: transparent !important;
    border: 2px solid rgba(255, 255, 255, 0.3) !important;
    border-radius: 10px !important;
    box-shadow: none !important;
}

.search-input ::v-deep(.el-input__inner) {
    color: white !important;
}

.search-input ::v-deep(.el-input__prefix) {
    color: white !important;
}
</style>